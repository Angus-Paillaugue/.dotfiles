import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { id } = params;
	const db = await createConnection();
	try {
    // TODO : List exercises in learning path and their completion status
		const [path] = await db.query(
			`
      SELECT
        lp.*
      FROM
        learning_paths lp
      WHERE
        lp.id = ?
      `,
			[id]
		);
		return { path: path[0] };
	} finally {
		db.end();
	}
}
