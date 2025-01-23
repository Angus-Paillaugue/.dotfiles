import ServerMonitoringDAO from './db/SererSurveillanceDAO';

export async function monitorServers() {
  const servers = await ServerMonitoringDAO.getAllMonitoredServers();

  console.log(servers);
}
