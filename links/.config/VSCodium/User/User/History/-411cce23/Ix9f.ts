import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { removeSongFromPlaylist } from '$lib/db/playlist';
import type { Song } from '$lib/types';

export const POST: RequestHandler = async ({ request, params }) => {
	const { song } = (await request.json()) as { song: Song };
	const { id: playlistId } = params;

	try {
		const isNowInPlaylist = await removeSongFromPlaylist(song.id, playlistId);

		return json({ success: true, message: 'Song added to playlist', isNowInPlaylist });
	} catch (e) {
		return json({ error: e instanceof Error ? e.message : e }, { status: 500 });
	}
};
