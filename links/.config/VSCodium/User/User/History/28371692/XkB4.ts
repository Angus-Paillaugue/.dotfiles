import { getAllSongs } from '$lib/songs';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const songs = await getAllSongs();
  return { songs  };
}) satisfies PageServerLoad;
