import db from '.';
import type { ServerMonitoring } from '@shared/types';

export async function findServerMonitoringByServerId(
  userId: number,
  serverId: number,
  start: Date = new Date(0),
  end: Date = new Date()
): Promise<ServerMonitoring[]> {
  if (!serverId) {
    return [];
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
    return rows as unknown as ServerMonitoring[];
  } catch (error) {
    console.error('Error getting server surveillance by serverId:', error);
    return [];
  }
}
