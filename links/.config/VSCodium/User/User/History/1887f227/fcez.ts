
import type { User } from '$lib/types';
import db from '.';
import { getUsersNote } from './note';


export async function createUser(username: User['username'], password: User['password']) {
	const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
	await db.execute(query, [username, password]);
}

export async function getUserById(id: User['id']) {
	const query = 'SELECT * FROM user WHERE id = ? LIMIT 1';
	const [rows] = await db.execute(query, [id]);
	if(rows.length === 0) return null;

	const user = rows[0] as User;
	const notes = await getUsersNote(user);
	user.notes = notes;
	return user;
}

export async function getUserByUsername(username: User['username']) {
	const query = 'SELECT * FROM user WHERE username = ? LIMIT 1';
	const [rows] = await db.execute(query, [username]);
	if(rows.length === 0) return null;

	const user = rows[0] as User;
	const notes = await getUsersNote(user);
	user.notes = notes;
	return user;
}
