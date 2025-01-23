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
          SELECT .*, count(orders.book_id) as number_of_orders
          from books
          left join orders
          on (books.book_id = orders.book_id)
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
