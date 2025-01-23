import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id: playlistId } = params;
	return new Response();
};
