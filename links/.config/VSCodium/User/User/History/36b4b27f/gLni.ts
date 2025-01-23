import ServerMonitoringDAO from './db/SererSurveillanceDAO';

export async function monitorServers() {
  const servers = await ServerMonitoringDAO.getAllMonitoredServers();

  for (const server of servers) {
    console.log('Monitoring server:', server.id);
    const isOnline = await checkServerStatus(server.publicUrl);
  }
}

const checkServerStatus = async(url: string) => {
  try {
    const res = await fetch(url);
    return res.status === 200;
  } catch {
    return false;
  }
}
