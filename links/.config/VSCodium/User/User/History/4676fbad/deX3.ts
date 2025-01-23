import type { LayoutServerLoad } from './$types';
import { getAllSongs } from '$lib/db/song';
import { getAllPlaylists } from '$lib/db/playlist';
import { getAllAlbums } from '$lib/db/album';
import { bootstrap } from '$lib/bootstrap';

export const load = (async ({ fetch }) => {

	const res = await fetch("/ton/api");
	const data = await res.json();
	console.log(data);





	await bootstrap();
	const songs = await getAllSongs();
	const playlists = await getAllPlaylists();
	const albums = await getAllAlbums();
	return { songs, playlists, albums };
}) satisfies LayoutServerLoad;
