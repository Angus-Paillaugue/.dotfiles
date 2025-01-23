import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const db = await createConnection();
  // const [rows] = await db.query('SELECT * FROM pages WHERE slug = ?', ['page']);
	return {};
}
