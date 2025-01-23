import db from '.';
import type { ServerMonitoring } from '@shared/types';

export async function findServerMonitoringByServerId(
  serverId: number
): Promise<ServerMonitoring[]> {
  if (!serverId) {
    return [];
  }
  try {
    const sql = `
      SELECT DATE(timestamp) AS day, JSON_ARRAYAGG(IFNULL(error, '')) AS errors
      FROM serverMonitoring
      WHERE serverId = ?
      AND timestamp >= CURDATE() - INTERVAL 90 DAY
      GROUP BY day;
    `;
    const [rows] = await db.query(sql, [serverId]);
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
