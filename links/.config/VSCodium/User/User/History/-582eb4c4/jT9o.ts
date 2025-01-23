import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addSongToPlaylist } from '$lib/songs';
import type { Song } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const { song, playlistName } = await request.json() as { song: Song, playlistName: string };

	try {
		await addSongToPlaylist(song, playlistName);

		return json({ success: true, message: 'Song added to playlist' });
	}catch(e){
		return json({ error: e instanceof Error ? e.message : e }, { status: 500 });
	}

};
