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
		SELECT
			p.id,
			p.name,
			p.titleSelector,
			p.urlSelector,
			p.descriptionSelector,
			p.dateSelector,
			p.imgSelector,
			JSON_ARRAYAGG(
        JSON_OBJECT(
					'id', c.id,
					'label', c.label,
					'url', c.url,
					'lang', c.lang
        )
    	) AS categories
			c.id, c.label, c.url, c.lang
		FROM categories c, providers p
		JOIN userCategories uc ON c.id = uc.categoryId
		JOIN users u ON uc.userId = u.id
		JOIN
			categories c ON c.providerId = p.id
		WHERE u.id = ?
		GROUP BY
			p.id;`,
		[user.id]
	);
	const [allCategories] = await db.query(`
		SELECT
			p.id,
			p.name,
			p.titleSelector,
			p.urlSelector,
			p.descriptionSelector,
			p.dateSelector,
			p.imgSelector,
			JSON_ARRAYAGG(
        JSON_OBJECT(
					'id', c.id,
					'label', c.label,
					'url', c.url,
					'lang', c.lang
        )
    	) AS categories
		FROM
    	providers p
		JOIN
			categories c ON c.providerId = p.id
		GROUP BY
			p.id;
	`);
	db.end();


	return { bookmarks, categories, allCategories };
}
