import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import LogDAO from './db/LogDAO';
import Logger from './logger';
import ExpressWebSocket from 'express-ws';
import { EventEmitter } from 'events';
import jwt from 'jsonwebtoken';
import { type LogLevel } from './db/LogDAO';

// Create an event emitter instance (for sending logs to WebSocket)
const logEventEmitter = new EventEmitter();
const expressWs = ExpressWebSocket(app);

const MAX_LOGS_SENT_PER_REQUEST = 50;

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hi, you need to send your logs to /logs endpoint');
});

// Endpoint to fetch logs from WebSocket
router.ws('/ws/logs', async (ws, req) => {
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
router.post('/logs', async (req: Request, res: Response) => {
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
router.get('/api/getLogsOverviewStatistics', async (req: Request, res: Response) => {
  try {
    const logsOverviewStatistics = await LogDAO.getLogsOverviewStatistics();
    res.status(200).send(logsOverviewStatistics);
  } catch (error) {
    Logger.error('Error getting logs overview statistics:', error);
    res.status(500).send({ status: 'error' });
  }
});

export default router;
