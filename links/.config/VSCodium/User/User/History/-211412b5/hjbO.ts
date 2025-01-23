import db from '.';
import type { ServerMonitoring } from '@shared/types';

export async function findServerSurveillanceByServerId(
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
    const [rows] = await db.query(sql, [serverId, start, end]);
    console.log(rows);
    // if (rows.length === 0) {
    //   return null;
    // }
    // return rows[0] as ServerMonitoring;
    return null
  } catch (error) {
    console.error('Error getting server surveillance by serverId:', error);
    return null;
  }
}
