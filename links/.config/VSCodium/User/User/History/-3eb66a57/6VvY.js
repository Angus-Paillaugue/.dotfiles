import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;
	const db = await createConnection();
	const [bookmarks] = await db.query(
		'SELECT * FROM bookmarks WHERE userId = ? ORDER BY date DESC',
		[user.id]
	);
	const [categories] = await db.query(
		`
		SELECT c.id, c.label, c.url, c.lang
		FROM categories c
		JOIN userCategories uc ON c.id = uc.categoryId
		JOIN users u ON uc.userId = u.id
		WHERE u.id = ?;`,
		[user.id]
	);
	const [allCategories] = await db.query(`
		SELECT
			c.id,
			c.label,
			c.url,
			c.lang,
			p.name,
			p.titleSelector,
			p.urlSelector,
			p.descriptionSelector,
			p.dateSelector,
			p.imgSelector
		FROM
			categories c
		JOIN
			providers p ON c.providerId = p.id
		GROUP BY
			c.name
	`);
	db.end();

	console.log(allCategories);


	return { bookmarks, categories, allCategories };
}
