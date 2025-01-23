import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import db from '$lib/server/db';

function sanitizeSQLQuery(query: string): string {
  // Trim whitespace and convert to uppercase for consistent matching
  const trimmedQuery = query.trim().toUpperCase();

  // Check if the query starts with 'SELECT'
  if (!trimmedQuery.startsWith('SELECT')) {
    throw new Error('Only SELECT queries are allowed');
  }

  // Define a list of potentially harmful SQL keywords
  const dangerousKeywords = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'ALTER', 'EXEC', 'MERGE'];

  // Replace dangerous keywords with an empty string
  let sanitizedQuery = query;
  dangerousKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    sanitizedQuery = sanitizedQuery.replace(regex, '');
  });

  return sanitizedQuery.endsWith(';') ? sanitizedQuery.slice(0, -1) : sanitizedQuery;
}

function addLimitToQuery(query: string, limit: number, offset: number) {
  query = query.endsWith(';') ? query.slice(0, -1) : query;
  return `${query} LIMIT ${limit} OFFSET ${offset}`;
}

export const POST: RequestHandler = async ({ request }) => {
  const { query, currentPage = 0 } = Object.fromEntries(await request.json());
  const NUMBER_OF_RESULTS_PER_PAGE = 10;

  try {
    const sanitizedQuery = sanitizeSQLQuery(query);
    const limitedQuery = addLimitToQuery(
      sanitizedQuery,
      NUMBER_OF_RESULTS_PER_PAGE,
      currentPage * NUMBER_OF_RESULTS_PER_PAGE
    );
    const [rows] = await db.execute(limitedQuery);
    const [numberOfResults] = await db.execute(
      `SELECT COUNT(*) AS count FROM (${sanitizedQuery}) AS subquery`
    );
    const numberOfPages = Math.ceil(numberOfResults[0].count / NUMBER_OF_RESULTS_PER_PAGE);
    console.log(numberOfPages);

    return json({
      success: true,
      message: 'Query ran successfully',
      rows,
      numberOfPages,
      currentPage: currentPage
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json({ error: true, message: error.message, numberOfPages: 0, currentPage: 0 });
    } else {
      return json({
        error: true,
        message: 'An unexpected error occurred!',
        numberOfPages: 0,
        currentPage: 0
      });
    }
  }
};
