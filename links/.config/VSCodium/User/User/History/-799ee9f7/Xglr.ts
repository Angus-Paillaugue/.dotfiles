import { deleteSong, getSongFromId } from '$lib/db/song';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ params }) => {
	const { id: songId } = params;

	const song = await update(songId);
	if (!song) {
		return json({ error: 'Song not found' }, { status: 404 });
	}

	// Delete song
	await deleteSong(song);

	return json({ message: 'Song deleted' });
};
