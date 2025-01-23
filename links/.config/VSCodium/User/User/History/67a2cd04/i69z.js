import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
	try {
		const [paths] = await db.query(
			`
      SELECT
        id,
        name,
        description
      FROM
        learning_paths
      `
		);

    db.end();
		return { paths };
	} finally {
		db.end();
	}
}
