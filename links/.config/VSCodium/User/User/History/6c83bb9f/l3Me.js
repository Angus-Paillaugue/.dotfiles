import { createConnection } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { url, title, date } = await request.json();
  const { user } = locals;
  const db = await createConnection();
  await db.query('INSERT INTO bookmarks (userId, url, title, date) VALUES (?, ?, ?, ?)', [
		user.id,
    url,
		title,
		date
	]);
	return new Response(null, { status: 204 });
}
