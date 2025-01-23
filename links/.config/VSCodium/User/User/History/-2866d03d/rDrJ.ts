import type { LayoutServerLoad } from './$types';
import { getUserByUsername } from '$lib/server/db/user';
import { error } from '@sveltejs/kit';

export const load = (async ({ params: { username } }) => {
  const user = await getUserByUsername(username);

  if (!user)
    throw error(404, 'User not found');

  return {
    user
  };
}) satisfies LayoutServerLoad;
