export interface BackendConfig {
  database?: {
    max_database_size?: number;
    prune_batch_size?: number;
    prune_interval?: number;
  };
  allowedIps?: string[];
  SMTP?: {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
    sendingFrom?: string;
  };
  monitoring?: {
    check_interval?: number;
  };
}
export interface FinalBackendConfig extends BackendConfig {
  database: {
    max_database_size: number;
    prune_batch_size: number;
    prune_interval: number;
  };
  allowedIps: string[];
  cachingTime: number;
  SMTP: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    sendingFrom: string;
  };
  monitoring: {
    check_interval: number;
  };
}


export const backendConfig: BackendConfig = {
  // Empty config, going with defaults
  allowedIps: [
    '::ffff:127.0.0.1', // IPv4 localhost
    '::ffff:172.18.0.1', // My local IP for testing purposes
  ]
}
