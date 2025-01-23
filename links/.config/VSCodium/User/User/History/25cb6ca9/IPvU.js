import mysql from 'mysql2/promise';
import { DB_PASSWORD } from '$env/static/private';

export async function createConnection(database = 'rss-news') {
	try {
		const db = await mysql.createConnection({
			host: 'localhost',
			user: 'rss-news',
			password: DB_PASSWORD,
			database: database
		});

		return db;
	} catch (e) {
		console.error('Could not connect to the database:', e);
	}
}

export async function getSpeedtest(db) {
	try {
		const [rows] = await db.query(`
			SELECT
				ROUND(latest.ping) AS latest_ping,
				ROUND(latest.download) AS latest_download,
				ROUND(latest.upload) AS latest_upload
			FROM ( SELECT * FROM results ORDER BY created_at DESC LIMIT 1 ) AS latest;
		`);
		return rows[0];
	} catch (error) {
		console.error('Error while getting speedtest results:', error);
		return {};
	}
}
