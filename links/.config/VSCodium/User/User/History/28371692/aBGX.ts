import type { PageServerLoad } from './$types';
import type { Song } from "$lib/types";
import { parseFile } from 'music-metadata';

async function listSongs() {
  const files = import.meta.glob('/songs/*', { eager: true });
  const keys = Object.keys(files);
  const songs: Song[] = await Promise.all(keys.map(async (key) => {
    const file = files[key];
    console.log(key)
    const metadata = await parseFile(file);
    return {
      path: '',
      title: '',
      artist: '',
      duration: metadata.format.duration,
    }
  }));
  return songs;
}


export const load = (async () => {
  const songs = await listSongs()
    return { songs  };
}) satisfies PageServerLoad;
