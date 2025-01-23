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

import osu from 'node-os-utils';
export interface ServerStatistics {
  uptime: number;
  memoryUsage: osu.MemInfo;
  cpuUsage: number;
}
