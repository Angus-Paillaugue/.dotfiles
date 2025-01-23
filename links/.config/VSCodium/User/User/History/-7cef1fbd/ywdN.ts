import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
  runQuery: async ({ params, request }) => {
  }
};
