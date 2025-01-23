import mysql from 'mysql2/promise';

export async function createConnection(database = 'speedtest') {
	try {
		const db = await mysql.createConnection({
			host: 'localhost',
			user: 'speedtest',
			password: 'speedtest',
			database: database
		});

		return db;
	} catch (e) {
		console.error('Could not connect to the database:', e);
	}
}
