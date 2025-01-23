import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
	try {
		const [paths] = await db.query(
			`
      SELECT count(e.learning_path_id)
          from exercises e
          left join learning_paths
          on (e.learning_path_id = learning_paths.id)
          group by
              e.learning_path_id
      `
		);
		return { paths };
	} finally {
		db.end();
	}
}
