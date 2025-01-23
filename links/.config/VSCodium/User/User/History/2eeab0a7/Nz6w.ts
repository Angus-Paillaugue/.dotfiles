import { getPlaylist } from '$lib/songs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { name } }) => {
  console.log(name);
  try {
    const playlist = await getPlaylist(name);
    return { playlist };
  } catch(e) {
    if(e instanceof Error) {
      throw error(404, e.message);
    }else if( e instanceof String) {
      throw error(404, e as string);
    }else {
      throw error(500, 'Internal Server Error');
    }
  }
}) satisfies PageServerLoad;
