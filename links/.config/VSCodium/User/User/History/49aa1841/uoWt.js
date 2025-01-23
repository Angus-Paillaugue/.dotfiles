import { pb } from '$lib/db';

export async function getUserOutfits({ user, page = 0}) {
	const NUMBER_OF_OUTFITS_PER_PAGE = 25;

	const outfits = await pb
		.collection('outfit')
		.getFullList({
				sort: '-created',
				filter: `owner = '${user.id}'`,
				expand: 'elements'
			}
		);

		console.log(outfits);
	for (const outfit of outfits) {
		if (outfit?.expand?.elements) {
			outfit.elements = outfit.expand.elements;
			delete outfit.expand;
		}
	}

	return outfits;
}
