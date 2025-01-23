export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface IncomingLog {
  level: LogLevel;
  message: string;
  timestamp: Date;
  source?: string;
  serverId?: string;
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
  description?: string;
  name: string;
  publicUrl: string;
  isOnline: boolean;
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
