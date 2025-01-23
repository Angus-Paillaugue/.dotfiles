// src/routes/e/+server.js
import { json } from '@sveltejs/kit';
import db from '$lib/server/db'; // Replace with your database connection

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	console.timeLog("Request received at POST /e");	
	try {
		const {
			propertyId,
			eventType,
			url,
			referrer,
			userId,
			deviceType,
			browser,
			operatingSystem,
			scroll_depth = null,
			duration_seconds = null,
			timestamp
		} = await request.json();

		// Insert data into the `events` table
		await db.execute(
			`INSERT INTO events (property_id, event_type, url, referrer, user_id, device_type, browser, operating_system, scroll_depth, duration_seconds, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				propertyId,
				eventType,
				url,
				referrer,
				userId,
				deviceType,
				browser,
				operatingSystem,
				scroll_depth,
				duration_seconds,
				timestamp
			]
		);

		return json({ status: 'success' });
	} catch (error) {
		console.error('Error logging event:', error);
		return json({ status: 'error', message: 'Failed to log event' }, { status: 500 });
	}
}
