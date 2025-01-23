import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { name } = await request.json();
	console.log(name);

	const playlist = {
		name,
		songs: []
	}

	return json({ playlist });
};
