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
  databaseSize: number; // in bytes
}

export interface Server {
  id: number;
  name: string;
  publicUrl: string;
  status?: 'online' | 'offline';
}


// CONFIGS
export interface BackendConfig {
  database?: {
    max_database_size?: number;
    prune_batch_size?: number;
    prune_interval?: number;
  },
  allowedIps?: string[];
}
export interface FinalBackendConfig extends BackendConfig {
  database: {
    max_database_size: number;
    prune_batch_size: number;
    prune_interval: number;
  },
  allowedIps: string[];
}
