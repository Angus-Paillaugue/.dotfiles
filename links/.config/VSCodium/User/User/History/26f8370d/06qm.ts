import { backendConfig } from "@shared/backend.config";

const config = backendConfig();

export function filterIp(req, res, next) {
  const sendersIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ip = sendersIp.split(',')[0];

  if (config.allowedIps.includes(ip)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}
