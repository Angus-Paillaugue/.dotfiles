import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

if (DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = await mysql.createConnection(DATABASE_URL);
const db = drizzle(client, { schema, mode: 'default' });

export default db;
