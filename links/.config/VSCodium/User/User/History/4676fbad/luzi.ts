import type { LayoutServerLoad } from './$types';
import { getAllSongs, getPlaylists } from '$lib/songs';
import type { Actions } from '@sveltejs/kit';

export const load = (async () => {
  const songs = await getAllSongs();
  const playlists = await getPlaylists();
  return { songs, playlists };
}) satisfies LayoutServerLoad;


export const actions: Actions = {
  createPlaylist: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData);
  }
};
