import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
	try {
		const [paths] = await db.query(
			`
      SELECT
        lp.id,
        lp.name,
        lp.description,
        (
          SELECT books.*, count(e.learning_path_id) as number_of_orders
          from exercises e
          left join orders
          on (books.book_id = e.learning_path_id)
          group by
              books.book_id
        ) as no_exercises
      FROM
        learning_paths lp
      `
		);
		return { paths };
	} finally {
		db.end();
	}
}
