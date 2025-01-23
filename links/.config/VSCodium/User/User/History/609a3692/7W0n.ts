import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const artistId = params.id;
	

	return { .id: playlist.id };
}) satisfies PageServerLoad;
