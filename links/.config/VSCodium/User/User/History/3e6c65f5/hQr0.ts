import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

if (!env.MYSQL_PASSWORD) throw new Error('MYSQL_PASSWORD is not set');
if (!env.MYSQL_USER) throw new Error('MYSQL_USER is not set');
if (!env.MYSQL_HOST) throw new Error('MYSQL_HOST is not set');
if (!env.MYSQL_DATABASE) throw new Error('MYSQL_DATABASE is not set');

async function initializeDatabase() {
  try {
    const db = await mysql.createPool({
      host: env.NODE_ENV === 'production' ? env.MYSQL_HOST : 'localhost',
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DATABASE,
      connectionLimit: 10,
      waitForConnections: true,
      debug: true,
      multipleStatements: true
    });

    console.log('Database connection established');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

const db = await initializeDatabase();

export default db;
