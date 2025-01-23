import { Request } from 'express';
import LogDAO from '../../db/LogDAO';
import Logger from '../../logger';
import WebSocket from 'ws';
import { authenticate, storeUnauthenticatedRequest } from '../../auth';
import osu from 'node-os-utils';
import { ServerStatistics } from '../../../../shared/types';
import DB from '../../db';
import { logEventEmitter } from './logs';
import ServerMonitoringDAO from 'src/db/ServerMonitoringDAO';
import { hasAtLeastOnePermission, hasPermission, PERMISSIONS } from '../../../../shared/roles';

const INTERVAL_BETWEEN_UPDATES = 1000;

async function getServerStatistics(): Promise<ServerStatistics> {
  const uptime = process.uptime();
  const memoryUsage = await osu.mem.info();
  const cpuUsage = await osu.cpu.usage();
  const databaseSize = await DB.getDatabaseSize();

  return {
    uptime,
    memoryUsage,
    cpuUsage,
    databaseSize
  };
}

export async function logsOverview(ws: WebSocket, req: Request) {
  const token = req.cookies['token'];
  const auth = await authenticate(token);

  if (!ws) return;
  if (!auth) {
    await storeUnauthenticatedRequest();
    ws.send(JSON.stringify({ success: false, error: 'Unauthorized' }));
    ws.close();
    return;
  }

  if(!hasAtLeastOnePermission(auth.role, PERMISSIONS.READ_LOG, PERMISSIONS.READ_SERVER)) {
    ws.send(JSON.stringify({ success: false, error: 'Forbidden' }));
    ws.close();
    return;
  }

  // Send initial data
  try {
    let logsOverviewStatistics = [];
    if(hasPermission)
    const logsOverviewStatistics = await LogDAO.getLogsOverviewStatistics();
    const serverStatistics = await getServerStatistics();
    const logStatisticsByDay = await LogDAO.getLogStatisticsByDay();
    const serversStatuses = await ServerMonitoringDAO.getServersStatuses();
    ws.send(
      JSON.stringify({
        action: 'initial',
        success: true,
        logsOverviewStatistics,
        serverStatistics,
        logStatisticsByDay,
        serversStatuses
      })
    );
  } catch (error) {
    Logger.error('Error getting logs overview statistics:', error);
    ws.send(
      JSON.stringify({
        action: 'initial',
        success: false,
        message: 'Error getting logs overview statistics'
      })
    );
    return;
  }

  // Send periodic updates
  const intervalId = setInterval(async () => {
    const serverStatistics = await getServerStatistics();

    ws.send(JSON.stringify({ action: 'serverStatisticsUpdate', serverStatistics, success: true }));
  }, INTERVAL_BETWEEN_UPDATES);

  const logsChanged = async () => {
    try {
      const logsOverviewStatistics = await LogDAO.getLogsOverviewStatistics();
      const logStatisticsByDay = await LogDAO.getLogStatisticsByDay();
      ws.send(
        JSON.stringify({
          action: 'newLogsReceived',
          logsOverviewStatistics,
          logStatisticsByDay,
          success: true
        })
      );
    } catch (error) {
      Logger.error('Error getting logs overview statistics:', error);
      ws.send(
        JSON.stringify({
          action: 'newLogsReceived',
          success: false,
          message: 'Error getting logs overview statistics'
        })
      );
    }
  };

  logEventEmitter.on('newLogs', logsChanged);

  ws.on('close', () => {
    clearInterval(intervalId);
    logEventEmitter.removeListener('newLogs', logsChanged);
  });
}
