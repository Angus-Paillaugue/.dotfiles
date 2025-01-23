import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import db from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
  const { query, page = 0 } = await request.json();
  const RESULTS_PER_PAGE = 10;

  try {
    const sql = `
    SELECT
      logs.level logLevel,
      logs.timestamp logTimestamp,
      logs.source logSource,
      logs.message logMessage,
      server.name serverName
    FROM logs, server
    WHERE server.id = logs.serverId
    AND logs.message LIKE CONCAT('%', ?, '%')
    LIMIT ? OFFSET ?`;
    const [results] = await db.query(sql, [query, RESULTS_PER_PAGE, page * RESULTS_PER_PAGE]);
    const [numberOfResults] = await db.query('SELECT COUNT(*) count FROM logs WHERE message LIKE CONCAT("%", ?, "%")', [query]);
    return json({
      success: true,
      message: 'Query ran successfully',
      results,
      numberOfPages: Math.ceil(numberOfResults[0].count / RESULTS_PER_PAGE)
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({ error: true, message: error.message, results: [] });
    } else {
      return json({
        error: true,
        message: 'An unexpected error occurred!',
        results: []
      });
    }
  }
};
