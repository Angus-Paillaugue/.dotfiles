import { getSongInfoFromId } from '$lib/songs';
import type { Playlist, Song } from '$lib/types';
import db from '.';
import type { RowDataPacket } from 'mysql2';

async function getPlaylistSongs(id: number): Promise<Song[]> {
	const query = `SELECT songId FROM beInPlaylist WHERE playlistId = ?;`;
	const [songsIds] = await db.execute<RowDataPacket[]>(query, [id]);

	const songs: Song[] = [];
	for(const row of songsIds) {
		const { songId } = row;
		const song = await getSongInfoFromId(songId);
		songs.push(song);
	}
	return songs;
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
