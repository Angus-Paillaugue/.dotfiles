import type { PageServerLoad } from './$types';

export const load = (async () => {
  const songs = await listSongs();
    return { songs  };
}) satisfies PageServerLoad;
