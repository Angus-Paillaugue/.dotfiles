import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit"
import { subDays } from 'date-fns';
import { findServerMonitoringByServerId } from '$lib/server/db/monitoring';

export const GET: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const startDate = new Date(url.searchParams.get('startDate')) || subDays(new Date(), 120);
  const endDate = url.searchParams.get('endDate') || new Date();
  const monitoring = await findServerMonitoringByServerId(parseInt(id), startDate, endDate);
  return json(monitoring);
};
