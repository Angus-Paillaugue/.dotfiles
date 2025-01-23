import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const db = await mysql.createConnection(env.DATABASE_URL);

export default db;
