import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
  runQuery: async ({ params, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { username, password } = formData as { username: string; password: string };
  }
};
