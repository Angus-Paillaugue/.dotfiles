import type { RequestHandler } from '@sveltejs/kit';
import type { Actions } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { name } = await request.json();

};
