import db from './';
import { type RowDataPacket } from 'mysql2';
import { type Server } from '@shared/types';

export async function getAllServers(): Promise<Server[]> {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM server');

  const servers = rows as Server[];
  for(const server of servers) {
    const res = await fetch(server.publicUrl);
    if(res.status !== 200) server.status = 'offline';
    else server.status = 'online';
  }
  return servers;
}

export async function getServerById(id: number): Promise<Server | null> {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM server WHERE id = ?', [id]);

  return (rows[0] as Server) || null;
}
