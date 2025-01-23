import { updateSong, getSongFromId } from '$lib/db/song';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ params }) => {
	const { updatedTrack } = params;


	// Update song
	console.log('Updating song', updatedTrack);
	await updateSong(updatedTrack);

	return json({ message: 'Song updated' });
};
