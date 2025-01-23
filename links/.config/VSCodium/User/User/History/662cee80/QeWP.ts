import type { PageServerLoad } from './$types';
import type { Dashboard } from './+page.svelte';

export const load = (async () => {
  const cards = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' }
  ];
  const dashboard: Dashboard = {
    id: 1,
    title: 'Dashboard',
    cards
  };
  return { dashboard };
}) satisfies PageServerLoad;
