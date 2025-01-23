import type { LayoutServerData } from './$types';
import { getAllServers } from '$lib/server/db/servers';

export const load = (async () => {
  const servers = await getAllServers();
  return { servers };
}) satisfies LayoutServerData;
