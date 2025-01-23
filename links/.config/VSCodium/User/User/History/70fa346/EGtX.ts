import { Request, Response } from 'express';

export default async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;

  console.log(`Logging in as ${username}...`);
  res.status(200).send('OK');
}
