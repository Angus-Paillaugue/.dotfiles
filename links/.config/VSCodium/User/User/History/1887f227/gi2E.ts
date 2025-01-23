
import type { User } from '$lib/types';
import db from '.';


export async function createUser(user: User) {
	const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
	await db.(query, [user.username, user.password]);
}
