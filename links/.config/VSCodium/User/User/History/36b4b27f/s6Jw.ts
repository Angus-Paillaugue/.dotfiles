import ServerMonitoringDAO, { ServerMonitoring } from './db/SererSurveillanceDAO';

export async function monitorServers() {
  const servers = await ServerMonitoringDAO.getAllMonitoredServers();

  for (const server of servers) {
    if (!server.publicUrl || !server.id)return;
    const isOnline = await checkServerStatus(server.publicUrl);
    console.log(server);
    const monitoring: ServerMonitoring = {
      isOnline,
      timestamp: new Date(),
      serverId: server.id
    }
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
