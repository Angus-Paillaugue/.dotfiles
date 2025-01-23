import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { removeSongFromPlaylist } from '$lib/songs';

export const load = (async ({ parent, params: { name } }) => {
	const { playlists, songs } = await parent();
	const playlist = playlists.find((playlist) => playlist.name === name);
	if (!playlist) {
		return error(404, 'Playlist not found');
	}

	await removeSongFromPlaylist(songs[0], playlist.name);

	return { playlist };
}) satisfies PageServerLoad;
