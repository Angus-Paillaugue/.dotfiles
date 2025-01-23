import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const problemsList = (
		await db.query(`
				SELECT
					table_schema AS name,
					ENGINE,
					ROW_FORMAT,
					SUM(TABLE_ROWS) AS TABLE_ROWS,
					AVG(AVG_ROW_LENGTH) AS AVG_ROW_LENGTH,
					SUM(DATA_LENGTH) AS DATA_LENGTH,
					SUM(INDEX_LENGTH) AS INDEX_LENGTH,
					MAX(AUTO_INCREMENT) AS AUTO_INCREMENT,
					MIN(CREATE_TIME) AS CREATE_TIME,
					MAX(UPDATE_TIME) AS UPDATE_TIME,
					ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size
				FROM
					information_schema.tables
				GROUP BY table_schema, ENGINE, ROW_FORMAT
				ORDER BY name DESC;
			`)
	)[0];
	return {};
}
