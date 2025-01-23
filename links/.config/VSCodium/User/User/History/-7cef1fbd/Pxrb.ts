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

export const actions: Actions = {
  runQuery: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { query } = formData as { query: string };

    try {
      const sanitizedQuery = sanitizeSQLQuery(query);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const [rows] = await db.execute(sanitizedQuery);

      return {
        success: true,
        message: 'Query ran successfully',
        rows
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return fail(500, { error: true, message: error.message });
      } else {
        return fail(500, { error: true, message: 'An unexpected error occurred!' });
      }
    }
  }
};
