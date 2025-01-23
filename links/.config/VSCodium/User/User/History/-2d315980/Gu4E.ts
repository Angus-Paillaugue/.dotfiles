import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit"
import { findServerMonitoringByServerId } from '$lib/server/db/monitoring';

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params;
  const monitoring = await findServerMonitoringByServerId(parseInt(id));
  return json(monitoring);
};
