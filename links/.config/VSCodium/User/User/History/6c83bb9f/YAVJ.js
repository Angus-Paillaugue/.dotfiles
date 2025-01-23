import { createConnection } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { url, title, date, img } = await request.json();
	if (!url || !title || !date || !img) {
		return new Response(null, { status: 400 });
	}
  const { user } = locals;
  const db = await createConnection();
  await db.query('INSERT INTO bookmarks (userId, url, title, img, date) VALUES (?, ?, ?, ?, ?)', [
		user.id,
		url,
		title,
		img,
		new Date(date).toISOString().slice(0, 19).replace('T', ' ')
	]);
	return new Response(null, { status: 204 });
}
