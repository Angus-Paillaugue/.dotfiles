import db from './';
import { type RowDataPacket } from 'mysql2';
import { type Server } from '@shared/types';

const isServerOnline = async (server: Server): Promise<boolean> => {
  if (!server.publicUrl) {
    return false
  }
  try {
    const res = await fetch(server.publicUrl);
    return res.status === 200;
  } catch {
    return false;
  }
}

export async function getAllServers(): Promise<Server[]> {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM server');

  const servers = rows as Server[];
  for(const server of servers) {
    server.isOnline = await isServerOnline(server);
  }
  return servers;
}

export async function getServerById(id: number): Promise<Server | null> {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM server WHERE id = ?', [id]);

  if(rows.length === 0) return null;
  const server = rows[0] as Server;
  server.isOnline = await isServerOnline(server);
  return server;
}


export async function createServer(server: Server): Promise<number> {
  const [result] = await db.query('INSERT INTO server SET ?', server);
  return result.insertId;
}
