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
	const isOwner = viewingUser.id === locals?.user?.id;

	if (!isOwner) {
		outfits = (
			await locals.pb.collection('outfits').getList(1, 20, {
				filter: `owner='${viewingUser.id}'`,
				expand: 'elements',
				sort: '-created'
			})
		)?.items;

		for (const i in outfits) {
			outfits[i].elements = outfits[i].expand.elements;
			delete outfits[i].expand;
		}

		if (!isOwner)
			// eslint-disable-next-line no-unused-vars
			viewingUser = (({
				collectionId,
				collectionName,
				verified,
				emailVisibility,
				updated,
				following,
				...o
			}) => o)(viewingUser);
	}

	return { viewingUser, outfits, isOwner };
}
