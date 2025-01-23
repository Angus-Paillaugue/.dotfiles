import { getNote } from '$lib/server/db/note';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { noteId  } }) => {
  const note = await getNote(Number(noteId));

  if(!note) {
    throw error(404, 'Note not found');
  }

	return { note };
}) satisfies PageServerLoad;
