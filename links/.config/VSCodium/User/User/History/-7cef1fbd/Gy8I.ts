import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

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

  return sanitizedQuery;
}

function addLimitToQuery(query: string, limit: number, offset: number) {
  query = query.endsWith(';') ? query.slice(0, -1) : query;
  return `${query} LIMIT ${limit} OFFSET ${offset}`;
}

export const actions: Actions = {
  runQuery: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { query, currentPage = '0' } = formData as { query: string; currentPage: string };
    const parsedCurrentPage = parseInt(currentPage, 10);
    const NUMBER_OF_RESULTS_PER_PAGE = 100;

    try {
      const sanitizedQuery = sanitizeSQLQuery(query);
      const limitedQuery = addLimitToQuery(
        sanitizedQuery,
        NUMBER_OF_RESULTS_PER_PAGE,
        parsedCurrentPage * NUMBER_OF_RESULTS_PER_PAGE
      );
      console.log('limitedQuery:', limitedQuery);
      const [rows] = await db.execute(limitedQuery);
      const [numberOfResults] = await db.execute(
        `SELECT COUNT(*) AS count FROM (${sanitizedQuery}) AS subquery`
      );
      const numberOfPages = Math.ceil(numberOfResults[0].count / NUMBER_OF_RESULTS_PER_PAGE);

      return {
        success: true,
        message: 'Query ran successfully',
        rows,
        numberOfPages,
        currentPage: parsedCurrentPage
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return fail(500, { error: true, message: error.message, numberOfPages: 0, currentPage: 0 });
      } else {
        return fail(500, {
          error: true,
          message: 'An unexpected error occurred!',
          numberOfPages: 0,
          currentPage: 0
        });
      }
    }
  }
};
