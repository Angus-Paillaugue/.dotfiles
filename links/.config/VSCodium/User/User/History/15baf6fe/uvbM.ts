import { Request, Response } from 'express';
import { knownServerIdsCache } from '../../index';

export function deletedServer(req: Request, res: Response) {
  const serverId = req.body.serverId;

  if (!serverId) {
    res.status(400).send({ status: 'error', message: 'serverId is required' });
    return;
  }

  if(knownServerIdsCache.includes(serverId)) {
    res.status(400).send({ status: 'success' });
    return;
  }

  knownServerIdsCache.remove(serverId);

  console.log('Server deleted:', serverId);
  console.log('Known servers:', knownServerIdsCache.get());

  res.status(200).send({ status: 'success' });
}
