import UserDAO, { type User } from '../db/UserDAO';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import LogDAO from '../db/LogDAO';
import { Log } from '@shared/types';
import { logEventEmitter } from '../routes/ws';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const storeUnauthenticatedRequest = async () => {
  const insertedLogs = await LogDAO.insertLog({
    level: 'warn',
    message: 'An unauthorized request was made to the logging server',
    timestamp: new Date()
  } as Log);
  logEventEmitter.emit('newLogs', insertedLogs);
};

export const authenticate = async (token: string): Promise<boolean> => {
  try {
    if (!token) throw new Error('No token was provided!');
    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded: unknown) => {
      if (err) throw new Error(err.message);
      const user = await UserDAO.findUserByUsername(decoded as string);
      if (!user) throw new Error('User not found');
    });
    return true;
  } catch (error) {
    await storeUnauthenticatedRequest();
    return false;
  }
};

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    await storeUnauthenticatedRequest();
    res.status(401).send('Unauthorized');
    return;
  }
  const auth = await authenticate(token);
  if (!auth) {
    await storeUnauthenticatedRequest();
    res.status(401).send('Unauthorized');
    return;
  }
  next();
};
