import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals  }) {
	const { user } = locals;
	const db = await createConnection();
	const [rows] = await db.query('SELECT * FROM bookmarks WHERE userId = ?', [user.id]);
	db.end();
	console.log(rows);
	
	return { bookmarks:rows };
};
