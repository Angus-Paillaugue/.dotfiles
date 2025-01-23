import { getUserByUsername } from '$lib/server/db/user';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { username } }) => {
  const user = await getUserByUsername(username);

  if (!user)
    throw error(404, 'User not found');

  return {
    user
  };
}) satisfies PageServerLoad;


