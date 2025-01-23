import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit"
import { subDays } from 'date-fns';
import { findServerMonitoringByServerId } from '$lib/server/db/monitoring';

export const GET: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const startDateParam = url.searchParams.get('startDate');
  const endDateParam = url.searchParams.get('endDate');
  const startDate = startDateParam ? new Date(startDateParam) : subDays(new Date(), 120);
  const endDate = endDateParam ? new Date(endDateParam) : new Date();
  
  const monitoring = await findServerMonitoringByServerId(parseInt(id), startDate, endDate);
  return json(monitoring);
};
