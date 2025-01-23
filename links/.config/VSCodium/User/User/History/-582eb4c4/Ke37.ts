import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createPlaylist } from '$lib/songs';
import type { Song } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const { song, playlistName } = await request.json() as { song: Song, playlistName: string };
	console.log(song);

	try {
		await add(name);
		const playlist = {
			name,
			songs: []
		}

		return json({ playlist });
	}catch(e){
		return json({ error: e instanceof Error ? e.message : e }, { status: 500 });
	}

};
