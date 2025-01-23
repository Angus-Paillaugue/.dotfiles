import { getDashboard } from '$lib/server/db/dashbaord';
import type { PageServerLoad } from '../$types';
import type { Dashboard } from './+page.svelte';

export const load = (async ({ params: { id: idDashboard} }) => {
  const dashboard = await getDashboard(idDashboard);
  return { dashboard };
}) satisfies PageServerLoad;
