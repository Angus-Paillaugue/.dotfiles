import DB from './db';
import LogDAO from './db/LogDAO';

const MAX_DB_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB in bytes
const PRUNE_BATCH_SIZE = 1000; // Number of logs to prune in each batch
const DELETE_INTERVAL = 1 * 60 * 60; // 1 minute

async function monitorDatabase() {
  try {
    const size = await DB.getDatabaseSize();

    if (size > MAX_DB_SIZE) {
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
