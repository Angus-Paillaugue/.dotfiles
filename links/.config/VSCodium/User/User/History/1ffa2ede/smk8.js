import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;
	const db = await createConnection();
	const [bookmarks] = await db.query('SELECT * FROM bookmarks WHERE userId = ?', [user.id]);
	const [categories] = await db.query('SELECT * FROM categories WHERE userId = ?', [user.id]);
	db.end();

	return { bookmarks };
}
