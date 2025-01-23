import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import * as schema from './schema';
import { DefaultLogger } from 'drizzle-orm/logger';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

class MyLogWriter {
  write(message) {
    console.error(message);
  }
}

const client = await mysql.createConnection(env.DATABASE_URL);
const logger = new DefaultLogger({ writer: (message) => {
    console.error(message);
  } });
const db = drizzle(client, { schema, mode: 'default', logger });

export default db;
