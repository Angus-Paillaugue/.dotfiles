import { createConnection } from '$lib/server/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { id } = params;
	const db = await createConnection();
	const [categories] = await db.query('SELECT * FROM categories');
	const [exercise] = await db.query('SELECT * FROM exercises WHERE id = ?', [id]);
	db.end();
	if(!exercise.length) throw new error(404, { message: 'Exercise not found' });
	return { categories };
}
