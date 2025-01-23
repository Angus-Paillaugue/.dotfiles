import type { PageServerLoad } from './$types';
import { getAllServers } from '$lib/server/db/servers';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;
