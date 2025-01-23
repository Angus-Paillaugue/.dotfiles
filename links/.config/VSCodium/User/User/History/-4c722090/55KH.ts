import db from './';
import { type RowDataPacket } from 'mysql2';

export interface Server {
  id: number;
  name: string;
  status?: "online" | "offline";
}

export async function getAllServers(): Promise<Server[]> {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM server');

  return rows as Server[];
}

export async function getServerById(id: number): Promise<Server | null> {
  const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM server WHERE id = ?', [id]);


  return (rows[0] as Server) || null;
}
