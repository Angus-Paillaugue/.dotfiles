import ServerMonitoringDAO from './db/SererSurveillanceDAO';

export async function monitorServers() {
  const servers = await ServerMonitoringDAO.getAllMonitoredServers();

  for (const server of servers) {
    console.log('Monitoring server:', server.id);
  }
}
