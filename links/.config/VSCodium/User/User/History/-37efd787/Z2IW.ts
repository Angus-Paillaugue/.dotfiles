import DB from '.';
import { format } from 'date-fns';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

class Log {
  id?: number;
  level: LogLevel;
  message: string;
  timestamp: Date;

  constructor(data: Log) {
    this.id = data.id;
    this.level = data.level;
    this.message = data.message;
    this.timestamp = data.timestamp;
  }
}
const logRotationDurationsInDays = {
  'debug': 1,
  'info': 7,
  'warn': 30,
  'error': 90,
  'fatal': 365,
}

const logRotationEnevents = `
CREATE EVENT IF NOT EXISTS rotate_logs_debug
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM logs WHERE level = 'debug' AND timestamp < DATE_SUB(NOW(), INTERVAL ${logRotationDurationsInDays['debug']} DAY);
`

class LogDAO {
  #db = DB.getInstance();

  async insertLogs(logs: Log[]): Promise<Log[]> {
    const newLogs: Log[] = [];
    for (const log of logs) {
      const newLog = await this.insertLog(log);
      newLogs.push(newLog);
    }
    return newLogs;
  }

  #convertToLog(row: any): Log {
    return new Log({
      id: row.id,
      level: row.level,
      message: row.message,
      timestamp: row.timestamp,
    });
  }

  async insertLog(log: Log): Promise<Log> {
    const sql = `
      INSERT INTO logs (level, message, timestamp)
      VALUES (?, ?, ?)
    `;
    const formattedTimestamp = format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss');
    const params = [log.level, log.message, formattedTimestamp];
    const insertId = await this.#db.execute(sql, params);
    log.id = insertId;
    return log;
  }

  async getLogs(limit: number = 100, offset: number = 0, level: LogLevel | 'all'): Promise<{ logs:Log[]; total:number; hasMore: boolean  }> {
    const getLogsSQL = `
      SELECT *
      FROM logs
      ${level !== 'all' ? 'WHERE level = "' + level + '"' : ''}
      ORDER BY timestamp DESC, id DESC
      LIMIT ?
      OFFSET ?
    `;
    const logsRows = await this.#db.query<any[]>(getLogsSQL, [limit, offset]);
    const logs = logsRows.map(this.#convertToLog);
    const totalNumberOfLogsSQL = `
      SELECT COUNT(*) as total
      FROM logs
      ${level !== 'all' ? 'WHERE level = "' + level + '"' : ''}
    `;
    const totalNumberOfLogs = await this.#db.query<any[]>(totalNumberOfLogsSQL);

    return { logs, total: totalNumberOfLogs[0].total, hasMore: totalNumberOfLogs[0].total > offset + limit };
  }

  async deleteLog(id: number): Promise<void> {
    const sql = `
      DELETE FROM logs
      WHERE id = ?
    `;
    await this.#db.query(sql, [id]);
  }
}

export default new LogDAO();
