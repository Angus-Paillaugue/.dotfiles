import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import db from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
  const { query } = await request.json();

  try {
    const sql = `
    SELECT
      log.level logLevel,
      log.timestamp logTimestamp
      log.source logSource
      server.name serverName
    FROM logs, server
    WHERE server.id = logs.serverId
    AND logs.message LIKE CONCAT('%', ?, '%')
    LIMIT 20`;
    const [results] = await db.execute(sql, [query]);
    console.log(results);
    return json({
      success: true,
      message: 'Query ran successfully',
      results
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
