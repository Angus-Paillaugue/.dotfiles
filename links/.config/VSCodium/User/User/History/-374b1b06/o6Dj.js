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
		return {};
	}
}

export async function getSpeedtest(db) {
	try {
		const [rows] = await db.query(`
			SELECT
				ROUND(latest.ping) AS latest_ping,
				ROUND(previous.ping) AS previous_ping,
				ROUND(latest.ping - previous.ping) AS ping_change,
				ROUND(latest.download) AS latest_download,
				ROUND(previous.download) AS previous_download,
				ROUND(((latest.download - previous.download) / previous.download) * 100, 1) AS download_change_percentage,
				ROUND(latest.upload) AS latest_upload,
				ROUND(previous.upload) AS previous_upload,
				ROUND(((latest.upload - previous.upload) / previous.upload) * 100, 1) AS upload_change_percentage
			FROM (
				SELECT *
				FROM results
				ORDER BY created_at DESC
				LIMIT 1
			) AS latest
			JOIN (
				SELECT *
				FROM results
				ORDER BY created_at DESC
				LIMIT 1 OFFSET 1
			) AS previous
			ON 1=1;
		`);
		return rows[0];
	} catch (error) {
		console.error('Error while getting speedtest results:', error);
		return {};
	}

}
