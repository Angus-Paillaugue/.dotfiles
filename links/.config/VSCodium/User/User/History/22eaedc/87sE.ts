import db from '.';
import { type ResultSetHeader } from 'mysql2';

export async function setMailing(userId: number, serverId: number, enabled: boolean): Promise<ResultSetHeader> {
  try {
    const [result] = await db.query('UPDATE emailing SET enabled = ? WHERE userId = ? AND serverId = ?', [
      enabled, userId,
      serverId,
      enabled
    ]);
    return result as ResultSetHeader;
  } catch {
    return null;
  }
}
