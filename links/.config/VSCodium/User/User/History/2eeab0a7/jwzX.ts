import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const {playlists} = await parent();
  const playlist = playlists.find((playlist) => playlist.name === name);
  if (!playlist) {
    return error(404, 'Playlist not found');
  }

  return { playlist };
}) satisfies PageServerLoad;
