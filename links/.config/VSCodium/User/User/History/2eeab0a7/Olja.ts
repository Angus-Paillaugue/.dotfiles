import type { LayoutServerLoad } from './$types';
import { getPlaylist } from '$lib/songs';

export const load = (async ({ params: { name } }) => {
  const playlist = await getPlaylist(name);
  return { playlist };
}) satisfies LayoutServerLoad;
