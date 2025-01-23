import { getSongFromId } from '$lib/db/song';
import type { Playlist, Song } from '$lib/types';
import db from '.';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

async function getPlaylistSongs(id: number): Promise<Song[]> {
	const query = `SELECT songId FROM beInPlaylist WHERE playlistId = ? ORDER BY addedAt DESC;`;
	const [songsIds] = await db.execute<RowDataPacket[]>(query, [id]);

	const songs: Song[] = [];
	for(const row of songsIds) {
		const { songId } = row as { songId: string };
		const song = await getSongFromId(songId);
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

export async function createPlaylist(title: string) {
	const query = `INSERT INTO playlist (id, title) VALUES (?)`;
	const id = new Date().getTime();
	const [res] = await db.execute<ResultSetHeader>(query, [id, title]);
	return res.insertId;
}

export async function addSongToPlaylist(songId: string, playlistId: string) {
	const query = `INSERT INTO beInPlaylist (songId, playlistId) VALUES (?, ?)`;
	await db.execute(query, [songId, playlistId]);
}

export async function removeSongFromPlaylist(songId: string, playlistId: string) {
	const query = `DELETE FROM beInPlaylist WHERE songId = ? AND playlistId = ?`;
	await db.execute(query, [songId, playlistId]);
}

export async function toggleSongFromPlaylist(song: Song, playlist: Playlist) {
	const isInPlaylist = playlist.songs.map((s) => s.id).includes(song.id);
	if (isInPlaylist) {
		await removeSongFromPlaylist(song.id, playlist.id);
	} else {
		await addSongToPlaylist(song.id, playlist.id);
	}

	return !isInPlaylist;
}

export async function savePlaylist(playlist: Playlist) {
	const query = `UPDATE playlist SET title = ? WHERE id = ?`;
	await db.execute(query, [playlist.title, playlist.id]);
}

export async function deletePlaylist(id: number) {
	const deleteSongsInPlaylistQuery = `DELETE FROM beInPlaylist WHERE playlistId = ?`;
	await db.execute(deleteSongsInPlaylistQuery, [id]);
	const deletePlaylistQuery = `DELETE FROM playlist WHERE id = ?`;
	await db.execute(deletePlaylistQuery, [id]);
}
