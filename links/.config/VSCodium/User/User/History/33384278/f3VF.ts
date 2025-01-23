import type { PageServerLoad } from './$types';
import { getDashboards } from '$lib/server/db/dashboard';

export const load = (async () => {
  const dashboards = await getDashboards();
  return {};
}) satisfies PageServerLoad;
