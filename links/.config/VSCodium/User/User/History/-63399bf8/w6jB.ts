import 'dotenv/config';
import { backendConfig } from '@shared/backend.config'
import { BackendConfig } from '@shared/types';

export const dbConfig = {
  host: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  waitForConnections: true,
  debug: false,
  multipleStatements: true
};

const defaultBackendConfig: BackendConfig = {
  max_database_size: 1 * 1024 * 1024 * 1024, // 1 GB in bytes
  prune_batch_size: 1000,
  prune_interval: 1 * 60 * 60, // 1 minute
};

export const getBackendConfig = () => {
  const config = { ...defaultBackendConfig, ...backendConfig };
  return config;
}
