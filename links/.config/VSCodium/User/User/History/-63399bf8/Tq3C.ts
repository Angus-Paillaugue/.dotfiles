import 'dotenv/config';
import { backendConfig } from '@shared/backend.config'
import { FinalBackendConfig } from '@shared/types';

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

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

const defaultBackendConfig: FinalBackendConfig = {
  database: {
    max_database_size: 1 * 1024 * 1024 * 1024, // 1 GB in bytes
    prune_batch_size: 1000, // Remove 1000 logs at a time
    prune_interval: 1 * 60 * 60 // 1 minute
  }
};

export const getBackendConfig = (): FinalBackendConfig => {
  const config = mergeDeep(defaultBackendConfig, backendConfig);
  return config;
};
