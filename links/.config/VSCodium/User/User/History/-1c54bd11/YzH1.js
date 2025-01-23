import db from '$lib/server/db';

export async function findByUsername(username) {
  const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

  if(user.length === 0) return null;
  return user[0];
}

export async function usernameIsTaken(username) {
  const user = await findByUsername(username);
  return user !== null;
}

export async function createNewUser(username, passwordHash) {
  await db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);
}
