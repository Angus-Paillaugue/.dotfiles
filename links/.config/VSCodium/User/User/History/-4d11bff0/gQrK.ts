import db from './index.js';
import { type ResultSetHeader } from 'mysql2';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
}

export async function createNewUser(username: string, passwordHash: string): Promise<ResultSetHeader> {
  const [rows] = await db.execute('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [
    username,
    passwordHash
  ]);
  return rows as ResultSetHeader;
}

export async function findUserByUsername(username: string): Promise<User[]> {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  if(rows.length === 0) return [];
  return rows[0] as User;
}

export async function usernameIsTaken(username: string) {
  const rows = await findUserByUsername(username);
  return rows.length > 0;
}
