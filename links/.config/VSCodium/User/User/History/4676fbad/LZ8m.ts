import type { LayoutServerLoad, Actions } from './$types';
import { getAllSongs, getPlaylists } from '$lib/songs';

export const load = (async () => {
  const songs = await getAllSongs();
  const playlists = await getPlaylists();
  return { songs, playlists };
}) satisfies LayoutServerLoad;


export const actions: Actions = {
	async createPlaylist({ request }) {
		const formData = Object.fromEntries(await request.formData());
		const { name } = formData as { name: string };
		console.log(name);
	}
};
