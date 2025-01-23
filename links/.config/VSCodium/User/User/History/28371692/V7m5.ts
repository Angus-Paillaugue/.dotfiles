import type { PageServerLoad } from './$types';
import type { Song } from "$lib/types";
import { parseFile } from 'music-metadata';
import { read } from 'ffmetadata'


async function listSongs() {
  const files = import.meta.glob('/songs/*');
  const keys = Object.keys(files);
  const songs: Song[] = await Promise.all(keys.map(async (path) => {
    path = "." + path
    read(path, (err, data) => {
      console.log(data)
      return null;
      // return {
      //   path,
      //   title: metadata.common.title,
      //   artist: metadata.common.artist,
      //   duration: Math.floor(metadata.format.duration),
      //   album: metadata.common.album,
      //   year: metadata.common.year
      // };
    });
  }));
  return songs;
}


export const load = (async () => {
  const songs = await listSongs();
    return { songs  };
}) satisfies PageServerLoad;
