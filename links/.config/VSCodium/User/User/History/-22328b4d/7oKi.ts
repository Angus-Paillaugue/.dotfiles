import type { Actions } from './$types';

export const actions: Actions = {
	async createPlaylist({ request }) {
		const formData = Object.fromEntries(await request.formData());
		const { name } = formData as { name: string };
		console.log(name);
	}
};
