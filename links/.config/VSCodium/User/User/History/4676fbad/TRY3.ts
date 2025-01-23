import type { LayoutServerLoad } from './$types';
import { getAllSongs, getPlaylists } from '$lib/db/song';

export const load = (async () => {
	const songs = await getAllSongs();
	const playlists = await getPlaylists();
	return { songs, playlists };
}) satisfies LayoutServerLoad;
