import { createConnection } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { user } = locals;
	const { categories } = await request.json();
	const db = await createConnection();
	const [userCategories] = (await db.query(
		`
		SELECT c.id, c.label, c.url, c.lang
		FROM categories c
		JOIN userCategories uc ON c.id = uc.categoryId
		JOIN users u ON uc.userId = u.id
		WHERE u.id = ?;`,
		[user.id]
	)) ?? [];

	console.log(userCategories);
	const userCategoriesMap = userCategories.reduce((acc, category) => {
		acc[category.id] = category;
		return acc;
	});

	console.log(userCategoriesMap);

	return new Response(null, { status: 204 });
}
