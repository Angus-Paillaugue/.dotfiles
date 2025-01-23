import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id: playlistId } = params;
	console.log(playlistId);

	try {

	} catch (error) {
		console.error(error);
		return json('Internal server error', { status: 500 });
	}
};
