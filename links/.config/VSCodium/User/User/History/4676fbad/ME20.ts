import type { LayoutServerLoad } from './$types';

export const load = (async () => {
  const songs = await getAllSongs();
    return { songs  };
}) satisfies LayoutServerLoad;
