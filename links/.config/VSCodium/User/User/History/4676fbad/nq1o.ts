import type { LayoutServerLoad } from './$types';
import { getAllSongs, getAllPlaylists } from '$lib/db/song';

export const load = (async () => {
	const songs = await getAllSongs();
	const playlists = await getAllPlaylists();
	return { songs, playlists };
}) satisfies LayoutServerLoad;
