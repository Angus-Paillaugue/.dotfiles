import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;
	const db = await createConnection();
	const [bookmarks] = await db.query('SELECT * FROM bookmarks WHERE userId = ?', [user.id]);
	const [categories] = await db.query(
		`
			SELECT c.id, c.label, c.url, c.lang,
				p.titleSelector, p.urlSelector, p.descriptionSelector,
				p.dateSelector, p.imgSelector
			FROM categories c
			JOIN userCategories uc ON c.id = uc.categoryId
			JOIN users u ON uc.userId = u.id
			JOIN providers p ON c.providerId = p.id
			WHERE u.id = ?;
		`,
		[user.id]
	);
	const [allCategories] = await db.query('SELECT * FROM categories');
	db.end();

	return { bookmarks, categories, allCategories };
}
