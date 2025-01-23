import { createConnection } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { id } = await request.json();
  const { user } = locals;
  const db = await createConnection();
  await db.query('DELETE FROM bookmarks WHERE id = ?', [id]);
	return new Response(null, { status: 204 });
}
