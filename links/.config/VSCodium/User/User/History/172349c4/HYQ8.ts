import { BackendConfig } from './types';

export const backendConfig: BackendConfig = {
  database: {
    max_database_size: (1/2) * 1024 * 1024 * 1024, // 500 Mb in bytes
  },
  port: 3000
}
