import { createConnection } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { user } = locals;
	const { categories: newCategories } = await request.json();
	const db = await createConnection();
	const [initialCategories] =
		(await db.query(
			`
		SELECT c.id
		FROM categories c
		JOIN userCategories uc ON c.id = uc.categoryId
		JOIN users u ON uc.userId = u.id
		WHERE u.id = ?;`,
			[user.id]
		)) ?? [];

		const initialCategoriesSet = new Set(initialCategories.map(c => c.id));

		const categoriesToInsert = newCategories.filter((c) => !initialCategoriesSet.has(c));
		const categoriesToDelete = initialCategoriesSet.filter(
			(c) => !newCategories.some((nc) => nc === c.id)
		);
		console.log(initialCategoriesSet);
	console.log(categoriesToDelete);

	await db.query('START TRANSACTION;');

	try {
		for (const category of categoriesToInsert) {
			await db.query('INSERT INTO userCategories (userId, categoryId) VALUES (?, ?);', [
				user.id,
				category
			]);
		}
		for (const category of categoriesToDelete) {
			await db.query('DELETE FROM userCategories WHERE userId = ? AND categoryId = ?;', [
				user.id,
				category
			]);
		}

		await db.query('COMMIT;');
	} catch (error) {
		await db.query('ROLLBACK;');
		return json(
			{ success: false, message: 'Error updating categories: ' + error },
			{ status: 500 }
		);
	} finally {
		await db.end();
	}

	return json({ success: true, message: 'Categories updated successfully' }, { status: 200 });
}
