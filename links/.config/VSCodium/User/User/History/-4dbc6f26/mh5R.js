import db from '$lib/server/db';

export function insertEvent({
	propertyId,
	eventType,
	path,
	referrer,
	userId,
	deviceType,
	browser,
	operatingSystem,
	scrollDepth = null,
	durationSeconds = null,
	timestamp
}) {
	return db.execute(
		`INSERT INTO events (property_id, event_type, path, referrer, user_id, device_type, browser, operating_system, scroll_depth, duration_seconds, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			propertyId,
			eventType,
			path,
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
