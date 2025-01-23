import db from '.';

export async function setMailing(userId: number, serverId: number, enabled: boolean): Promise<ResultSetHeader> {
  const [result] = await db.query('INSERT INTO emailing(`userId`, `serverId`, `enabled`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE enabled = ?', [userId, serverId, enabled, enabled]);
  return result as ResultSetHeader;
}
