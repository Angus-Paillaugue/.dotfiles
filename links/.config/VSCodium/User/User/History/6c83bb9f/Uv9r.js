import { createConnection } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { url, title, date, img, color, description } = await request.json();
	console.log({ url, title, date, img, color, description });
	
	if (!url || !title || !date || !img | !color || color.length !== 6 || !description) {
		return new Response(null, { status: 400 });
	}
  const { user } = locals;
  const db = await createConnection();
  await db.query('INSERT INTO bookmarks (userId, url, title, description, img, color, date) VALUES (?, ?, ?, ?, ?, ?, ?)', [
		user.id,
		url,
		title,
		description.slice(0, 500),
		img,
		color,
		new Date(date).toISOString().slice(0, 19).replace('T', ' ')
	]);
	return new Response(null, { status: 204 });
}
