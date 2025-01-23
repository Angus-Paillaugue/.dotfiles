import type { LayoutServerLoad } from './$types';
import { getAllSongs } from '$lib/songs';

export const load = (async () => {
  const songs = await getAllSongs();
    return { songs  };
}) satisfies LayoutServerLoad;
