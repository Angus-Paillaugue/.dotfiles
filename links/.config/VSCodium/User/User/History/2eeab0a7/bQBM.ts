import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deletePlaylist } from '$lib/db/playlist';
import { invalidateAll } from '$app/navigation';

export const load = (async ({ parent, params }) => {
	const playlistId = Number(params.id);
	const { playlists, ...restProps } = await parent();
	const playlist = playlists.find((playlist) => playlist.id === playlistId);
	if (!playlist) {
		return error(404, 'Playlist not found');
	}

	return { playlist, ...restProps };
}) satisfies PageServerLoad;

export const actions: Actions = {
	deletePlaylist: async ({ params }) => {
		try {
			const playlistId = Number(params.id);
			await deletePlaylist(playlistId);
		} catch (e) {
			return fail(500, { message: e instanceof Error ? e.message : e });
		}

		invalidateAll
		throw redirect(303, '/');
	}
};
