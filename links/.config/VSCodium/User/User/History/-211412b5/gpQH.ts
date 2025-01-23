import db from '.';

export interface ServerMonitoring {
  id?: number;
  serverId: number;
  isOnline: boolean;
  timestamp: Date;
}

class ServerMonitoringDAO {
  async findServerSurveillanceByServerId(
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
      const rows = await db.query(sql, [serverId, start, end]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0] as ServerMonitoring;
    } catch (error) {
      console.error('Error getting server surveillance by serverId:', error);
      return null;
    }
  }
}

export default new ServerMonitoringDAO();
