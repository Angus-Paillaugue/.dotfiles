import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit"
import { findServerMonitoringByServerId } from '$lib/server/db/monitoring';

export const GET: RequestHandler = async () => {
  const monitoring = await findServerMonitoringByServerId(parseInt(id));
  return new Response();
};
