import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { name } = await request.json();
};
