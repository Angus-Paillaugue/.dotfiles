import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
  runQuery: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { query } = formData as { query: string; };

    console.log('Query:', query);
  }
};
