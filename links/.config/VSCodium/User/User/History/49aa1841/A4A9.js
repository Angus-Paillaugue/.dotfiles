import { pb } from '$lib/db';

export async function getUserOutfits({ user, page = 0}) {
	const NUMBER_OF_OUTFITS_PER_PAGE = 25;

	const outfits = await pb
		.collection('outfit')
		.getList(
			page * NUMBER_OF_OUTFITS_PER_PAGE,
			page * NUMBER_OF_OUTFITS_PER_PAGE + NUMBER_OF_OUTFITS_PER_PAGE,
			{
				sort: '-created',
				expand: 'elements',
				filter: `owner = '${user.id}'`,
				limit: NUMBER_OF_OUTFITS_PER_PAGE
			}
		);
	
	for (const outfit of outfits.items) {
		console.log(outfit);
		if (outfit?.expand?.elements) {
			outfit.elements = outfit.expand.elements;
			delete outfit.expand;
		}
	}

	return outfits;
}
