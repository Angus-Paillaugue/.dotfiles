import type { PageServerLoad } from './$types';
import type { Dashboard } from './+page.svelte';

export const load = (async () => {
  const cards = [
    { id: 1, title: 'Card 1', request: 'SELECT * FROM user;' },
    { id: 2, title: 'Card 2', request: 'SELECT * FROM user;', data: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ] }
  ];
  const dashboard: Dashboard = {
    id: 1,
    title: 'Dashboard',
    cards
  };
  return { dashboard };
}) satisfies PageServerLoad;
