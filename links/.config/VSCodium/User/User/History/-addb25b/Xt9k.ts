import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addItemToListNote } from '$lib/server/db/note';
import type { ListNoteItem, Note } from '$lib/types';

export const PUT: RequestHandler = async ({ request }) => {
	const { note }: Note = await request.json();
};
