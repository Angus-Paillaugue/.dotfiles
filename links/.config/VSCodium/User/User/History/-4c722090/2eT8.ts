import db from './';
import { type ResultSetHeader, type RowDataPacket } from 'mysql2';

export interface Server {
  id: number;
  name: string;
  status: "online" | "offline";
}
