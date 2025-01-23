
import type { User } from '$lib/types';
import db from '.';


export async function createUser(user: User) {
	const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
	const [result] = await db.execute(query, [user.username, user.password]);
}
