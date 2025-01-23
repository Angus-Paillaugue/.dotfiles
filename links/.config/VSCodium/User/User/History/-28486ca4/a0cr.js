import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
  const [latestExercises] = await db.query(`
    SELECT * FROM exercises
    ORDER BY created_at DESC
    LIMIT 10
  `);
	return {};
}
