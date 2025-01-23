import { Request, Response } from 'express';
import { findUserByUsername } from '../db/user';

export default async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;

  console.log(`Logging in as ${username}...`);
  try {
    const user = await findUserByUsername(username);
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
  } catch(e) {
    return res.status(401).send('Unknown username');
  }
  res.status(200).send('OK');
}
