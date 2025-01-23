import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db'; // Your database connection

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
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

		// Send a success response with CORS headers
		return json(
			{ status: 'success' },
			{
				headers: {
					'Access-Control-Allow-Origin': '*', // Allows requests from any origin
					'Access-Control-Allow-Methods': 'POST, OPTIONS', // Specifies allowed HTTP methods
					'Access-Control-Allow-Headers': 'Content-Type' // Specifies allowed headers
				}
			}
		);
	} catch (error) {
		console.error('Error logging event:', error);
		return json(
			{ status: 'error', message: 'Failed to log event' },
			{
				status: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type'
				}
			}
		);
	}
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export function OPTIONS() {
	// Handle CORS preflight requests
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	});
}
