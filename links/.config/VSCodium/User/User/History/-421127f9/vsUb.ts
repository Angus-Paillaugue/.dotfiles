import { getBackendConfig } from './config';
import DB from './db';
import LogDAO from './db/LogDAO';

const config = getBackendConfig();

async function monitorDatabase() {
  try {
    const size = await DB.getDatabaseSize();

    if (size > config.max_database_size) {
      console.log('Database size exceeded limit. Pruning old logs...');
      await LogDAO.pruneLogs(PRUNE_BATCH_SIZE);
      console.log(`Pruned ${PRUNE_BATCH_SIZE} logs.`);
    }
  } catch (error) {
    console.error('Error monitoring database size:', error);
  }
}

// Run the monitor periodically
export function startMonitoring() {
  monitorDatabase();
  setInterval(monitorDatabase, DELETE_INTERVAL); // Check every 60 seconds
}
