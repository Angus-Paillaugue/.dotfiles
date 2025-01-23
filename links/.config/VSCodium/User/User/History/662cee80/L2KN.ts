import type { PageServerLoad } from './$types';
import type { Dashboard } from './+page.svelte';

export const load = (async () => {
  const dashboard: Dashboard = {
    id: 1,
    title: 'Dashboard',
  }
  return {};
}) satisfies PageServerLoad;
