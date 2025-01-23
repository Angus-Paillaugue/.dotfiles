import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { username } = params;
	let outfits = [];

	let viewingUser = (
		await locals.pb.collection('users').getList(1, 1, {
			filter: `username='${username}'`
		})
	).items[0];

	if (!viewingUser) error(404, 'User not found');

	return { viewingUser, outfits };
}
