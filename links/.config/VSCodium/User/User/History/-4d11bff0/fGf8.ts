import db from './index.js';
import { type ResultSetHeader } from 'mysql2';

export async function createNewUser(username: string, hash: string): Promise<ResultSetHeader> {
  const [rows] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
    username,
    hash
  ]);
  return rows as ResultSetHeader;
}

export async function findUserByUsername(username: string): Promise<ResultSetHeader> {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows as ResultSetHeader;
}

export async function usernameIsTaken(username: string) {
  const rows = await findUserByUsername(username);
  return rows.length > 0;
}
