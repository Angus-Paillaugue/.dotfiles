import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addItemToListNote } from '$lib/server/db/note';
import type { ListNoteItem } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	const { item, position, noteId } = await request.json();

  console.log('addListItem', noteId, item, position);

  const id = await addItemToListNote(noteId, item, position);
  const newItem: ListNoteItem

  return json({ success: true });
};
