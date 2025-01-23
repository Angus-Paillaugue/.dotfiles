import type { LayoutServerLoad } from './$types';
import { getAllSongs, getPlaylists } from '$lib/songs';

export const load = (async () => {
  const songs = await getAllSongs();
  const playlists = await getPlaylists();
  console.log(playlists);
  return { songs, playlists };
}) satisfies LayoutServerLoad;
