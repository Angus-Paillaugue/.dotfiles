import mysql from 'mysql2/promise';
import { DB_PASSWORD } from '$env/static/private';

export async function createConnection() {
	try {
		const db = await mysql.createConnection({
			host: host || 'localhost',
			user: user || 'skillforge',
			password: DB_PASSWORD,
			database: database || 'skillforge'
		});
		return db;
	} catch (e) {
		console.error('Could not connect to the database:', e);
	}
}
