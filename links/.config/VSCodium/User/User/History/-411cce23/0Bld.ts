import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { removeSongFromPlaylist, toggleSongFromPlaylist } from '$lib/db/playlist';
import type { Playlist, Song } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const { song } = (await request.json()) as { song: Song };
	const { id: playlistID } = request;

	try {
		const isNowInPlaylist = await removeSongFromPlaylist(song.id, playlistId);

		return json({ success: true, message: 'Song added to playlist', isNowInPlaylist });
	} catch (e) {
		return json({ error: e instanceof Error ? e.message : e }, { status: 500 });
	}
};
