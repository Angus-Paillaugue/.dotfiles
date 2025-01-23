import { Request, Response, NextFunction } from 'express';
import { findUserByUsername } from '../db/user';
import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateAccessToken(username: string): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(username, process.env.JWT_SECRET);
}

export default async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if(!user) {
      return res.status(401).send('Unknown username');
    }

    const compare = compareSync(password, user.passwordHash);
    if(!compare) {
      return res.status(401).send('Incorrect password');
    }

    const token = generateAccessToken(username);

    res.status(200).send(token);
  } catch(e) {
    if(e instanceof Error) {
      console.error(e.message);
      return res.status(401).send(e.message);
    }
    return res.status(401).send(e);
  }
}
