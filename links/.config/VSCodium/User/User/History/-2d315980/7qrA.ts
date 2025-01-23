import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit"
import { subDays } from 'date-fns';
import { findServerMonitoringByServerId } from '$lib/server/db/monitoring';

export const GET: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const startDateParam = url.searchParams.get('startDate');
  const startDate = startDateParam ? new Date(startDateParam) : subDays(new Date(), 120);

  const monitoring = await findServerMonitoringByServerId(parseInt(id), startDate);
  return json(monitoring);
};
