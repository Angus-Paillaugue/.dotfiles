export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface IncomingLog {
  level: LogLevel;
  message: string;
  timestamp: Date;
  source?: string;
  serverId?: number;
}

export interface Log extends IncomingLog {
  logId: number;
  logLevel: LogLevel;
  logMessage: string;
  logSource: string;
  logTimestamp: Date;
  serverId: number;
  serverName: string;
  serverDescription?: string;
  serverUrl: string | null;
}
