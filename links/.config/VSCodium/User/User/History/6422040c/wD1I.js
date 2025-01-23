import { createConnection } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { id } = await request.json();
  const { user } = locals;
  const db = await createConnection();
  await db.query('INSERT INTO bookmarks (userId, url, title, date) VALUES (?, ?, ?, ?)', [
		user.id,
		url,
		title,
		new Date(date).toISOString().slice(0, 19).replace('T', ' ')
	]);
	return new Response(null, { status: 204 });
}
