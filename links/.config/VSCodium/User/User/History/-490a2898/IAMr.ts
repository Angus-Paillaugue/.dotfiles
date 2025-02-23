import db from './';
import { type ResultSetHeader, type RowDataPacket } from 'mysql2';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: 'owner' | 'admin' | 'guest';
}

export async function hasAUserRegistered(): Promise<boolean> {
  const [rows] = await db.execute<RowDataPacket[]>('SELECT COUNT(*) count FROM user');
  return rows.length > 0 && rows[0].count > 0;
}

export async function createNewUser(
  username: string,
  passwordHash: string,
  role: string = 'guest'
): Promise<ResultSetHeader> {
  const [rows] = await db.execute(
    'INSERT INTO user (username, passwordHash, role) VALUES (?, ?, ?)',
    [username, passwordHash, role]
  );
  return rows as ResultSetHeader;
}

export async function findUserByUsername(username: string): Promise<User | null> {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT * FROM user WHERE BINARY username = ?',
      [username]
    );
    if (rows.length === 0) return null;
    return rows[0] as User;
  } catch (error) {
    console.error('Error finding user by username:', error);
    return null;
  }
}

export async function usernameIsTaken(username: string): Promise<boolean> {
  const user = await findUserByUsername(username);
  if (user === null) return false;
  return user.username === username;
}

export async function updateUsername(id: number, username: string): Promise<ResultSetHeader> {
  const [rows] = await db.execute('UPDATE user SET username = ? WHERE id = ?', [username, id]);
  return rows as ResultSetHeader;
}

export async function updatePassword(id: number, passwordHash: string): Promise<ResultSetHeader> {
  const [rows] = await db.execute('UPDATE user SET passwordHash = ? WHERE id = ?', [
    passwordHash,
    id
  ]);
  return rows as ResultSetHeader;
}

export async function getAllUsers(): Promise<User[]> {
  const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM user ORDER BY id;');
  return rows as User[];
}

export async function deleteUser(id: number): Promise<ResultSetHeader> {
  const [rows] = await db.execute('DELETE FROM user WHERE id = ?', [id]);
  return rows as ResultSetHeader;
}

export async function updateUser(
  id: number,
  { username, role }: { username: string; role: User["role"] }
): Promise<ResultSetHeader> {
  if(!username || !role) throw new Error('Username and role are required to update a user.');

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    throw new Error('Username can only contain letters and numbers!');
  }

  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters long!');
  }

  if (username.length > 20) {
    throw new Error('Username must be at most 20 characters long!');
  }

  if (role == 'owner') {
    throw new Error('Only one person can have this role!');
  }

  const usernameIsAlreadyUsed = await usernameIsTaken(username);

  if (usernameIsAlreadyUsed) {
    throw new Error('Username is already taken!');
  }

  const [rows] = await db.execute('UPDATE user SET username = ?, role = ? WHERE id = ?', [
    username,
    role,
    id
  ]);
  return rows as ResultSetHeader;
}
