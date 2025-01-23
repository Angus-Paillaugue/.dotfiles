import { Request, Response, NextFunction } from 'express';
import { getBackendConfig } from '@shared/configs';

const config = getBackendConfig();

export function filterIp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sendersIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(sendersIp);
  if(!sendersIp) {
    res.status(403).send('Forbidden');
    return;
  }

  

  const ip = sendersIp.split(',')[0];

  if (config.allowedIps.includes(ip)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}
