import { updateSong } from '$lib/db/song';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request }) => {
	const { updatedTrack } = await request.json();

	// Update song
	console.log('Updating song', updatedTrack);
	await updateSong(updatedTrack);

	return json({ message: 'Song updated' });
};
