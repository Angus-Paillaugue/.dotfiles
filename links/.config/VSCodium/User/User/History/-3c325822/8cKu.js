import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
	const [noUsers] = await db.query('SELECT COUNT(*) FROM users');
	db.end();
	return { noUsers: noUsers[0] };
}
