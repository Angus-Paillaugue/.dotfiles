import { Request, Response, NextFunction } from 'express';
import { getBackendConfig } from '@shared/configs';

const config = getBackendConfig();

export function filterIp(req: Request, res: Response, next: NextFunction) {
  const sendersIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(sendersIp);
  if (!sendersIp) {
    res.status(403).send('Forbidden');
    return;
  }

  const ip = (Array.isArray(sendersIp) ? sendersIp[0] : sendersIp).split(',')[0];
  console.log(ip);

  if (config.allowedIps.includes(ip)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}
