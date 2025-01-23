import { createConnection } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const db = await createConnection();
  const { name } = params;

  try {
		const [rows] = await db.query(`
      SELECT
        TABLE_NAME,
        TABLE_TYPE,
        ENGINE,
        ROW_FORMAT,
        TABLE_ROWS,
        AVG_ROW_LENGTH,
        DATA_LENGTH,
        INDEX_LENGTH,
        AUTO_INCREMENT,
        CREATE_TIME,
        UPDATE_TIME,
        TABLE_COLLATION
      FROM
        INFORMATION_SCHEMA.TABLES
      WHERE
        TABLE_SCHEMA = '${name}';
    `);

		return json(rows[0]);
	} catch (error) {
		console.error('Error while getting database infos:', error);
		return json({}, { status: 500 });
	}
}
