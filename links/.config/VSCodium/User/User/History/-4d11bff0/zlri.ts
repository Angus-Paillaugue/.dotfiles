import db from './index.js';

export async function createNewUser(username: string, hash: string): Promise<OkPacket> {
  const [rows] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
    username,
    hash
  ]);
  return rows;
}

export async function findUserByUsername(username: string): Promise<unknown[]> {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows;
}

export async function usernameIsTaken(username: string) {
  const rows = await findUserByUsername(username);
  return rows.length > 0;
}
