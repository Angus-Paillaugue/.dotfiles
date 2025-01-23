import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createPlaylist } from '$lib/songs';

export const POST: RequestHandler = async ({ request }) => {
	const { name } = await request.json();
	console.log(name);

	try {
		createPlaylist(name);
		const playlist = {
			name,
			songs: []
		}

		return json({ playlist });
	}catch(e){
		
		return json({ error: e.message }, { status: 500 });
	}

};
