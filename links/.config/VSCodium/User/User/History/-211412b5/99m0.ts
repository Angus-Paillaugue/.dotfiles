import db from '.';

export async function findServerMonitoringByServerId(
  serverId: number
): Promise<{ day: Date; errors: [ string | null]; duration: number }[]> {
  if (!serverId) {
    return [];
  }
  try {
    const sql = `
      SELECT DATE(timestamp) as day, JSON_ARRAYAGG(error) errors, AVG(duration) duration
      FROM serverMonitoring
      WHERE serverId = ?
      AND timestamp >= CURDATE() - INTERVAL 90 DAY
      GROUP BY day;
    `;
    const [rows] = await db.query(sql, [serverId]);

    if (!rows) {
      return [];
    }
    const typedTows = rows as unknown as { day: Date; errors: [string | null]; duration: number }[];
    console.log(typedTows.map((row) => row.errors.filter((e) => e !== null)));
    typedTows.map((row) => row.errors.filter((e) => e));
    return typedTows;
  } catch (error) {
    console.error('Error getting server surveillance by serverId:', error);
    return [];
  }
}
