import { Server, ServerMonitoring } from '../../../shared/types';
import DB from '.';
import Logger from 'src/logger';

class ServerMonitoringDAO {
  async findServerMonitoringByServerId(
    serverId: number,
    start: Date,
    end: Date
  ): Promise<ServerMonitoring | null> {
    if (!serverId) {
      return null;
    }
    try {
      const sql = `
        SELECT *
        FROM serverMonitoring
        WHERE serverId = ?
        ${start ? 'AND timestamp >= ?' : ''}
        ${end ? 'AND timestamp <= ?' : ''}
      `;
      const rows = await DB.query(sql, [serverId, start, end]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0] as ServerMonitoring;
    } catch (error) {
      console.error('Error getting server surveillance by serverId:', error);
      return null;
    }
  }

  async createServerMonitoring(
    serverId: number,
    {
      timestamp,
      duration,
      error
    }: { timestamp: Date; duration: number; hasTimedOut: boolean; error: string | null }
  ) {
    try {
      const sql = `
        INSERT INTO serverMonitoring (serverId, duration, error, timestamp)
        VALUES (?, ?, ?, ?)
      `;
      const params = [serverId, duration, error, timestamp];
      await DB.execute(sql, params);
    } catch {
      Logger.error('Error creating server monitoring');
    }
  }

  async getAllMonitoredServers(): Promise<Server[]> {
    try {
      const sql = `
        SELECT
          *
        FROM server
        WHERE monitored = 1
        AND publicUrl IS NOT NULL
        AND publicUrl <> '';
      `;
      const rows = await DB.query(sql);
      return rows as Server[];
    } catch (error) {
      console.error('Error getting all monitored servers:', error);
      return [];
    }
  }

  async getServersStatuses(): Promise<{ server: Server; online: boolean; error?: string[] }[]> {
    const servers = await this.getAllMonitoredServers();
    const serverStatuses = await Promise.all(
      servers.map(async (server) => {
        if(!server.publicUrl) return;
        const serverMonitoring = await this.findServerMonitoringByServerId(server.id, new Date(), new Date());
        if (!serverMonitoring) {
          return { server, online: false, error: ['No monitoring data'] };
        }
        return { server, online: true };
      })
    );
    return serverStatuses;
  }
}

export default new ServerMonitoringDAO();
