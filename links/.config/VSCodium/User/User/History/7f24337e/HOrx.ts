import { getNote } from '$lib/server/db/note';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { noteId  } }) => {
  const note = await getNote
	return {};
}) satisfies PageServerLoad;
