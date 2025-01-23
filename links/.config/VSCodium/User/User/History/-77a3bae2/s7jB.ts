import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllSongs, refreshSongs } from '$lib/songs';

export const POST: RequestHandler = async ({ request }) => {
	const { songId } = await request.json();
	if (!songId) {
		throw new Error('Song ID is required.');
	}

	await refreshSongs();

	try {
		const songs = await getAllSongs();
		return json({ songs, success: true, message: 'Song downloaded successfully.' });
	} catch (error) {
		return json({ success: false, message: error instanceof Error ? error.message : error });
	}
};
