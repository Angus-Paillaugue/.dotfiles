import { getUserById } from '$lib/db/user';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const user = await getUserById
}) satisfies PageServerLoad;
