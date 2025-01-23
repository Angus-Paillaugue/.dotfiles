import { getPlaylist } from '$lib/songs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  console.log(await parent())
}) satisfies PageServerLoad;
