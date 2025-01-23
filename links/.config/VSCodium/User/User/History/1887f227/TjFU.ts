
import type { User } from '$lib/types';
import db from '.';

export async function exemple(): Promise<void> {
	const query = 'DELETE FROM song WHERE id = ?';
	await db.execute(query, [params]);
}

export async function createUser(user: User)
