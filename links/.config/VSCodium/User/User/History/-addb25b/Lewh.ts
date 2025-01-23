import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Note } from '$lib/types';

export const PUT: RequestHandler = async ({ request }) => {
	const { note }: { note: ListNote } = await request.json();

  console.log(note)

  return json({ success: true });
};
