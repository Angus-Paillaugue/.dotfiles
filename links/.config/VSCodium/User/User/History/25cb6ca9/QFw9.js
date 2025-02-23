import mysql from 'mysql2/promise';
import { DB_PASSWORD } from '$env/static/private';

/**
 * Creates a connection to the MySQL database.
 *
 * @param {Object} config - The configuration object for the database connection.
 * @param {string} [config.database='rss-news'] - The name of the database.
 * @param {string} [config.user='rss-news'] - The username for the database.
 * @param {string} [config.host='localhost'] - The host of the database.
 * @returns {Promise<Object>} The database connection object.
 * @throws Will throw an error if the connection to the database fails.
 */
export async function createConnection({ database = 'rss-news', user = 'rss-news', host = 'localhost' }) {
	try {
		const db = await mysql.createConnection({
			host,
			user,
			password: DB_PASSWORD,
			database: database
		});

		return db;
	} catch (e) {
		console.error('Could not connect to the database:', e);
	}
}
