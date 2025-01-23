import { Request, Response } from 'express';

export default async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;
}
