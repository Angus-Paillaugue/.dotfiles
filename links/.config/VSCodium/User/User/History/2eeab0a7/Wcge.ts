import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { addSongToPlaylist } from '$lib/songs';

export const load = (async ({ parent, params: { name } }) => {
  const {playlists} = await parent();
  const playlist = playlists.find((playlist) => playlist.name === name);
  if (!playlist) {
    return error(404, 'Playlist not found');
  }

  addSongToPlaylist

  return { playlist };
}) satisfies PageServerLoad;
