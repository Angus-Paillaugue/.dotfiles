import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const problemsList = (
		await db.query(`
      SELECT
        *
      FROM
        Problems
      GROUP BY table_schema, ENGINE, ROW_FORMAT
      ORDER BY name DESC;
    `)
	)[0];
	return {};
}
