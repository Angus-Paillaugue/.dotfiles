import db from '.';
import type { ServerMonitoring } from '@shared/types';
import { subDays } from 'date-fns';

export async function findServerMonitoringByServerId(
  serverId: number
): Promise<ServerMonitoring[]> {
  if (!serverId) {
    return [];
  }
  try {
    const sql = `
      SELECT *
      FROM serverMonitoring
      WHERE serverId = ?
      AND timestamp >= ?
    `;
    const [rows] = await db.query(sql, [serverId, subDays(new Date(), 90)]);
    if (!rows) {
      return [];
    }
    return rows as unknown as ServerMonitoring[];
  } catch (error) {
    console.error('Error getting server surveillance by serverId:', error);
    return [];
  }
}
