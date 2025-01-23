import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DATABASE_URL } from '$env/dynamic/private';
import * as schema from './schema';

console.log(env);

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = await mysql.createConnection(env.DATABASE_URL);
const db = drizzle(client, { schema, mode: 'default' });

export default db;
