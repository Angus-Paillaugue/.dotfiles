import type { LayoutServerLoad } from './$types';
import { getAllSongs } from '$lib/db/song';
import { getAllPlaylists } from '$lib/db/playlist';
import { getAllAlbums } from '$lib/db/album';
import { bootstrap } from '$lib/bootstrap';
import { downloadArtistPicture, getAllArtists } from '$lib/db/artist';

export const load = (async () => {
	await bootstrap();
	const songs = await getAllSongs();
	const playlists = await getAllPlaylists();
	const albums = await getAllAlbums();
	const artists = await getAllArtists();
	for (const artist of artists) {
		// song.artist = artists.find((a) => a.id === song.artistId);
		await downloadArtistPicture(artist.name, artist.id);
	}
	return { songs, playlists, albums };
}) satisfies LayoutServerLoad;
