import { getUserByUsername } from '$lib/db/user';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  console.log(params)
  const user = await getUserByUsername(params.username);

  if (!user)
    throw error(404, 'User not found');


  return {
    user
  };
}) satisfies PageServerLoad;
