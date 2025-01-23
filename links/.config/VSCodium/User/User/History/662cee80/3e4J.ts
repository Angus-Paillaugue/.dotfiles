import type { PageServerLoad } from '../$types';
import type { Dashboard } from './+page.svelte';

export const load = (async ({ params: { id: idDashboard} }) => {
  const dashboard = await 
  return { dashboard };
}) satisfies PageServerLoad;
