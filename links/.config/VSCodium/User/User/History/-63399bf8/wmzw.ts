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
  max_database_size: 100000000,
  prune_batch_size: 1000,
  prune_interval: 1000 * 60 * 60 * 24
};

export const getBackendConfig = () => {
  return backendConfig;
}
