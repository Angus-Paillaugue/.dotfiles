import { Request, Response } from 'express';
import { findUserByUsername } from '../db/user';
import { compareSync } from 'bcryptjs';

export default async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;

  console.log(`Logging in as ${username}...`);
  try {
    const user = await findUserByUsername(username);
    if(!user) {
      return res.status(401).send('Unknown username');
    }

    const compare = compareSync(password, user.passwordHash);
  } catch(e) {
    return res.status(401).send('Unknown username');
  }
  res.status(200).send('OK');
}
