import mysql from 'mysql2/promise';
import { MYSQL_PASSWORD, MYSQL_USER, MYSQL_HOST, MYSQL_DATABASE, } from '$env/static/private';

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const db = await mysql.createPool({
	host: MYSQL_HOST,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
	connectionLimit: 10
});

export default db;
