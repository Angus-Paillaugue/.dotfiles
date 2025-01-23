import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;
	const db = await createConnection();
	const [bookmarks] = await db.query('SELECT * FROM bookmarks WHERE userId = ?', [user.id]);
	const [categories] = await db.query(`
		SELECT c.id, c.label, c.url, c.lang
		FROM categories c
		JOIN user_categories uc ON c.id = uc.categoryId
		JOIN users u ON uc.userId = u.id
		WHERE u.id = ?;`,
		[user.id]
	);
	db.end();

	return { bookmarks, categories };
}
