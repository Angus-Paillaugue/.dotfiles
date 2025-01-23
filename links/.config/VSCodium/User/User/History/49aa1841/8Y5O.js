import { pb } from '$lib/db';

export async function getUserOutfits({ user, page = 0}) {
	const NUMBER_OF_OUTFITS_PER_PAGE = 25;

	const outfits = await pb
		.collection('outfit')
		.getList(
			page,
			NUMBER_OF_OUTFITS_PER_PAGE,
			{
				sort: '-created',
				filter: `owner = '${user.id}'`,
				expand: 'elements'
			}
		);

	for (const outfit of outfits.items) {
		if (outfit?.expand?.elements) {
			outfit.elements = outfit.expand.elements;
			delete outfit.expand;
		}
	}

	return outfits;
}


export async function getOutfit(id) {
	if (!id) throw new Error('No outfit ID provided');

	const outfit = await pb.collection('outfit').getOne(id, { expand: 'elements' });
	if (!outfit) throw new Error('Outfit not found');

	if (outfit?.expand?.elements) {
		outfit.elements = outfit.expand.elements;
		delete outfit.expand;
	}

	return outfit;
}
