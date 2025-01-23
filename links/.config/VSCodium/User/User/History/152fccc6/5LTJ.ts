import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import LogDAO from './db/LogDAO';
import UserDAO from './db/UserDAO';
import Logger from './logger';
import ExpressWebSocket from 'express-ws';
import { EventEmitter } from 'events';
import jwt from 'jsonwebtoken';
import { type LogLevel } from './db/LogDAO';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

const app: Express = express();
const port = process.env.PORT || 3000;
const expressWs = ExpressWebSocket(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

async function authenticate(token: string | null): Promise<boolean> {
  const storeUnauthenticatedRequest = async () => {
    const insertedLogs = await LogDAO.insertLog({
      level: 'error',
      message: 'An unauthorized request was made to the logging server',
      timestamp: new Date()
    });

    // Emit event for new logs
    logEventEmitter.emit('newLogs', insertedLogs);
  }
  if(token == null) {
    await storeUnauthenticatedRequest();
    return false;
  }
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    return true;
  } catch (error) {
    await storeUnauthenticatedRequest();
    return false;
  }
}

interface AuthenticatedRequest extends Request {
  user?: any;
}
async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies['token'];

  if (!await authenticate(token)) {
    res.redirect('/log-in');
    return;
  }

  next();
}

// Create an event emitter instance (for sending logs to WebSocket)
const logEventEmitter = new EventEmitter();

const MAX_LOGS_SENT_PER_REQUEST = 50;

const router = express.Router();

app.get('/', (req: Request, res: Response) => {
  res.send('Hi, you need to send your logs to /logs endpoint');
});

// Endpoint to fetch logs from WebSocket
expressWs.app.ws('/ws/logs', async (ws, req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    const insertedLogs = await LogDAO.insertLog({
      level: 'error',
      message: 'An unauthorized request was made to the logging server',
      timestamp: new Date()
    });

    // Emit event for new logs
    logEventEmitter.emit('newLogs', insertedLogs);
    ws.close(1008, 'Unauthorized');
    return;
  }

  const check = await jwt.verify(token, process.env.TOKEN_SECRET as string);

  if (!check) {
    const insertedLogs = await LogDAO.insertLog({
      level: 'error',
      message: 'An unauthorized request was made to the logging server',
      timestamp: new Date()
    });

    // Emit event for new logs
    logEventEmitter.emit('newLogs', insertedLogs);
    ws.close(1008, 'Unauthorized');
    return;
  }

  // Handle incoming messages
  ws.on('message', async (msg: string) => {
    const {
      action,
      offset,
      limit,
      level = 'all',
      id,
      logIds
    }: {
      action: string;
      offset?: number;
      limit?: number;
      level?: LogLevel | 'all';
      id?: number;
      logIds?: number[];
    } = JSON.parse(msg);

    switch (action) {
      // Fetch logs from database
      case 'fetchLogs':
        try {
          const logs = await LogDAO.getLogs(limit || MAX_LOGS_SENT_PER_REQUEST, offset || 0, level);

          if (!logs.success) {
            throw logs.error;
          }
          ws.send(
            JSON.stringify({
              action: 'fetchLogs',
              ...logs,
              success: true,
              offset: (offset || 0) + logs.logs.length
            })
          );
        } catch (error) {
          Logger.error('Error getting logs:', error);
          ws.send(JSON.stringify({ action: 'fetchLogs', success: false, message: error }));
        }
        break;

      // Delete a log
      case 'deleteLog':
        if (!id) {
          ws.send(
            JSON.stringify({ action: 'deleteLog', success: false, message: 'id is required' })
          );
          return;
        }
        try {
          const deletedLog = await LogDAO.deleteLog(id);
          if (!deletedLog) {
            Logger.error('Log not found');
            ws.send(JSON.stringify({ success: false, error: 'Log not found' }));
          }
          ws.send(JSON.stringify({ action: 'deleteLog', success: true, id }));
        } catch (error) {
          Logger.error('Error deleting log:', error);
          ws.send(JSON.stringify({ action: 'deleteLog', success: false, message: error }));
        }
        break;

      // Delete multiple logs
      case 'deleteLogs':
        if (!logIds) {
          ws.send(
            JSON.stringify({
              action: 'deleteLogs',
              success: false,
              message: 'logIds is required'
            })
          );
          return;
        }

        try {
          for (const id of logIds) {
            const deletedLog = await LogDAO.deleteLog(id);
            if (!deletedLog) {
              Logger.error('Log not found');
              ws.send(JSON.stringify({ success: false, error: 'Log not found' }));
            }
          }
          ws.send(JSON.stringify({ action: 'deleteLogs', success: true }));
        } catch (error) {
          Logger.error('Error deleting log:', error);
          ws.send(JSON.stringify({ action: 'deleteLogs', success: false, message: error }));
        }
        break;

      // Unknown action
      default:
        Logger.error('Unknown action:', action);
        ws.send(JSON.stringify({ success: false, error: 'Unknown action ' + action }));
        break;
    }
  });

  // Listen for new log events and send to client
  logEventEmitter.on('newLogs', (logs) => {
    ws.send(JSON.stringify({ action: 'newLogs', success: true, logs }));
  });
});

// Endpoint to receive logs from package
router.post('/logs', authenticateToken, async (req: Request, res: Response) => {
  const logs = req.body;

  try {
    const insertedLogs = await LogDAO.insertLogs(logs);

    // Emit event for new logs
    logEventEmitter.emit('newLogs', insertedLogs);

    res.status(200).send({ status: 'success' });
  } catch (error) {
    Logger.error('Error inserting logs:', error);
    res.status(500).send({ status: 'error' });
  }
});

// Endpoint to get logs overview statistics
router.get('/getLogsOverviewStatistics', authenticateToken, async (req: Request, res: Response) => {
  try {
    const logsOverviewStatistics = await LogDAO.getLogsOverviewStatistics();
    res.status(200).send(logsOverviewStatistics);
  } catch (error) {
    Logger.error('Error getting logs overview statistics:', error);
    res.status(500).send({ status: 'error' });
  }
});

// AUTHENTICATION
router.post('/auth/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await UserDAO.getUserByUsername(username);

  if (!user) {
    res.status(401).send({ success: false, message: 'Invalid username or password' });
    return;
  }

  const check = await bcrypt.compare(password, user.passwordHash);

  if (!check) {
    res.status(401).send({ success: false, message: 'Invalid username or password' });
    return;
  }

  const token = jwt.sign({ username }, process.env.TOKEN_SECRET as string);
  res.cookie('token', token, { httpOnly: true });
  res.status(200).send({ status: 'success' });
});
router.post('/auth/logout', async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).send({ status: 'success' });
});
router.post('/auth/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await UserDAO.getUserByUsername(username);

  if (user) {
    res.status(400).send({ success: false, message: 'Username already exists' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await UserDAO.createUser(username, passwordHash);
});

app.use('/api', router);

app.listen(port, () => {
  Logger.info(`[server]: Server is running at http://localhost:${port}`);
});
