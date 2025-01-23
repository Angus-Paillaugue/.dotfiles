import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';

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
    }catch (error) {
      console.error('Error running query:', error);
      return fail
    }

  }
};
