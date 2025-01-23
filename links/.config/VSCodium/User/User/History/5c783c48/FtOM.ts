import { getSongFromId } from '$lib/db/song';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id: songId } = params;

	const song = await getSongFromId(songId);
};
