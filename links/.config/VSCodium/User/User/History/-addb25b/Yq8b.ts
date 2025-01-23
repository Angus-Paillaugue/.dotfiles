import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ListNote } from '$lib/types';
import { saveNote } from '$lib/server/db/note';

export const PUT: RequestHandler = async ({ request }) => {
	const { note }: { note: ListNote } = await request.json();

  await saveNote(note);

  return json({ success: true });
};
