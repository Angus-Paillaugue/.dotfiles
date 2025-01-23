import mysql from 'mysql2/promise';
import { DB_PASSWORD } from '$env/static/private';

/**
 * Creates a connection to the specified database.
 *
 * @param {string} [database='rss-news'] - The name of the database to connect to.
 * @returns {Promise<Object>} A promise that resolves to the database connection object.
 * @throws Will throw an error if the connection to the database fails.
 */
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
