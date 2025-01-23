
import type { User } from '$lib/types';
import db from '.';


export async function createUser(user: User) {
	const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
	await db.execute(query, [user.username, user.password]);
}

export async function getUserById(id: User['id']) {
	const query = 'SELECT * FROM user WHERE id = ? LIMIT 1';
	const [rows] = await db.execute(query, [id]);
	if(rows.length === 0) return null;

	return rows[0] as User;
}
