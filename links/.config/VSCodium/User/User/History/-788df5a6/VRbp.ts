import { writable } from "svelte/store";
import type { Playlist, Song } from "./types";

export const currentlyPlayingSong = writable<Song & { isPlaying: boolean } | null>(null);

export const songs = writable<Song[]>([]);

export const playlists = writable<Playlist[]>([]);
