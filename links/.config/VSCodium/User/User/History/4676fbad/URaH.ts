import type { LayoutServerLoad } from './$types';
import { getAllSongs } from '$lib/db/song';

export const load = (async () => {
	const songs = await getAllSongs();
	const playlists = await getAllPlaylists();
	const albums = await getAllAlbums();
	return { songs, playlists, albums };
}) satisfies LayoutServerLoad;
