import { Request, Response } from 'express';

export default async function authenticate(req: Request, res: Response) {
  const { token } = req.body;
}
