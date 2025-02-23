import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { user, token } = locals;
  return { user, token  };
}) satisfies PageServerLoad;
