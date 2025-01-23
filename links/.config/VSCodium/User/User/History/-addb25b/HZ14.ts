import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ListNote } from '$lib/types';
import { saveNote } from '$lib/server/db/note';

export const PUT: RequestHandler = async ({ request }) => {
	let { note }: { note: ListNote } = await request.json();

  note = await saveNote(note) as ListNote;

  return json({ success: true, note });
};
