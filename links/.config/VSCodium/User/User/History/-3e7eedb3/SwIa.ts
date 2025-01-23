import mysql from 'mysql2/promise';
import { MYSQL_PASSWORD='APAILL40'
MYSQL_USER='root'
MYSQL_HOST='localhost'
MYSQL_DATABASE='logify' } from '$env/static/private';

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const db = await mysql.createPool({
	uri: DATABASE_URL,
	connectionLimit: 10
});

export default db;
