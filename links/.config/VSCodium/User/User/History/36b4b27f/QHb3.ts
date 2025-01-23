import { getAllMonitoredServers } from './db/SererSurveillanceDAO';

export async function monitorServers() {
  const servers = await getAllMonitoredServers();

  console.log(servers);
}
