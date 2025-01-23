import type { Playlist, Song } from '$lib/types';
import db from '.';
import type { RowDataPacket } from 'mysql2';

async function getPlaylistSongs(id: number): Promise<Song[]> {
	const query = `SELECT songId FROM beInPlaylist WHERE playlistId = ?;`;
	const songsIds = await db.execute<RowDataPacket<>[]>(query, [id]);

	for(const songId of songsIds) {
		console.log(songId);
	}
	return [];
}

export async function getAllPlaylists() {
	const query = `SELECT id, title FROM playlist`;
	const [playlists] = await db.execute<RowDataPacket[]>(query);
	for (const playlist of playlists) {
		const playlistSongs = await getPlaylistSongs(playlist.id);
		playlist.songs = playlistSongs;
	}

	return playlists as Playlist[];
}
