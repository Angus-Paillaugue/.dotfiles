import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
  runQuery: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { query } = formData as { query: string; };

    try {
      const [rows] = await db.execute(query);
      console.log('Rows:', rows);

      return {
        success: true,
        message: 'Query ran successfully',
        rows
      }
    }catch (error as any as (Error & { sqlMessage: string })) {
      console.error('Error running query:', error.sqlMessage);
      return fail(500, { error: true, message: error.sqlMessage });
    }

  }
};
