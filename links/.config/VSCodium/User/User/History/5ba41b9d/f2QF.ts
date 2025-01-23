import DB from './';

export interface User {
  id: number;
  username: string;
  password: string;
}

export async function findUserByUsername(username: string): Promise<User> {
  const [rows] = await DB.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
  if(rows.length === 0) {
    throw new Error('User not found');
  }
  return rows[0];
}
