import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit"
import { findServerMonitoringByServerId } from '$lib/server/db/monitoring';

export const GET: RequestHandler = async ({ params, url }) => {
  const { id } = params;
  const startDate = url.searchParams.get('startDate') || '';
  const monitoring = await findServerMonitoringByServerId(parseInt(id));
  return json(monitoring);
};
