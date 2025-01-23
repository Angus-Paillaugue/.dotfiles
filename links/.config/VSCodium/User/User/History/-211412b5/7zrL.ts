import db from '.';
import type { ServerMonitoring } from '@shared/types';

export async function findServerMonitoringByServerId(
  serverId: number,
  start: Date = new Date(0),
  end: Date = new Date()
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
    const [rows] = await db.query(sql, [serverId, start, end]);
    console.log(rows);
    if (!rows) {
      return [];
    }
    return rows as ServerMonitoring;
    return null;
  } catch (error) {
    console.error('Error getting server surveillance by serverId:', error);
    return null;
  }
}
