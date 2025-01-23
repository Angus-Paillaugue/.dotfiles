import DB from './db';
import LogDAO from './db/LogDAO';

const MAX_DB_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB in bytes
const PRUNE_BATCH_SIZE = 10; // Number of logs to prune in each batch

async function monitorDatabase() {
  const db = DB.getInstance();

  try {
    const size = await db.getDatabaseSize();
    console.log(`Current database size: ${size} bytes`);

    if (size > MAX_DB_SIZE) {
      console.log('Database size exceeded limit. Pruning old logs...');
      await LogDAO.pruneLogs(PRUNE_BATCH_SIZE);
      console.log(`Pruned ${PRUNE_BATCH_SIZE} logs.`);
    }
  } catch (error) {
    console.error('Error monitoring database size:', error);
  } finally {
    db.end();
  }
}

// Run the monitor periodically
export function startMonitoring() {
  monitorDatabase();
  setInterval(monitorDatabase, 60000); // Check every 60 seconds
}
