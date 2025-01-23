import { writable } from "svelte/store";

export const currentlyPlayingSong = writable<Song | null>(null);
