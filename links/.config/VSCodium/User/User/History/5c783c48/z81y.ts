import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id: songId } = params;

	// Delete song from database
	await 
};
