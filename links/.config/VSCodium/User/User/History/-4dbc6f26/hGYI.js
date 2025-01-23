import db from '$lib/server/db';

export function insertEvent({
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
}) {
	return db.execute(
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
			scrollDepth,
			durationSeconds,
			timestamp
		]
	);
}
