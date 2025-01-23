import db from './index.js';
import { users } from './schema.js';

export async function createNewUser(username, hash) {
  await db.insert(users).values({ username, password_hash: hash })
}

export async function findUserByUsername(username) {
  return await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.username, username)
	});
}
