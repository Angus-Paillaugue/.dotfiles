import type { Actions } from './$types';

export const actions: Actions = {
	async createPlaylist({ request }) {
		const formData = Object.fromEntries(await request.formData());
		const { name } = formData as { name: string };
		console.log(name);
	}
};
export const POST: RequestHandler = async ({ request }) => {
	const { songId } = await request.json();
	if (!songId) {
		throw new Error('Song ID is required.');
	}

	try {
		const song = await downloadSong(songId);
		return json({ song, success: true, message: 'Song downloaded successfully.' });
	}
	catch (error) {
		return json({ success: false, message: error instanceof Error ? error.message : error });
	}
};
