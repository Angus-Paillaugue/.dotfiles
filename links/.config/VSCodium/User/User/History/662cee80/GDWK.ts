import { getDashboard } from '$lib/server/db/dashbaord';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load = (async ({ params: { id: idDashboard} }) => {
  try {
    const dashboard = await getDashboard(idDashboard);
    return { dashboard };
  }catch(e){
    throw error(404, 'Dashboard not found');
  }
}) satisfies PageServerLoad;
