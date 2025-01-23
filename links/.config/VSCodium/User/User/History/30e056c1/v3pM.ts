export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface IncomingLog {
  level: LogLevel;
  message: string;
  timestamp: Date;
  source?: string;
  serverName?: string;
}

export interface Log extends IncomingLog {
  id: number;
}


export interface ServerStatistics {
  uptime: number;
  memoryUsage: { totalMemMb: number; usedMemMb: number; freeMemMb: number; freeMemPercentage: number; };
  cpuUsage: number;
}
