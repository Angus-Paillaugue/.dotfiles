import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { song } = params;

	// Delete song from database
	await
};
