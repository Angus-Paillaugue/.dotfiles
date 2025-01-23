import { pb } from '$lib/db';

export async function getUserOutfits({ user, page = 0 }) {
	const NUMBER_OF_OUTFITS_PER_PAGE = 25;

	try {
		const outfits = await pb
			.collection('outfit')
			.getList(
				page * NUMBER_OF_OUTFITS_PER_PAGE,
				page * NUMBER_OF_OUTFITS_PER_PAGE + NUMBER_OF_OUTFITS_PER_PAGE,
				{
					sort: '-created',
					filter: `owner = '${user.id}'`,
					expand: 'elements'
				}
			);

		console.log('Raw response:', outfits);

		for (const outfit of outfits.items) {
			console.log('Outfit:', outfit);
			if (outfit?.expand?.elements) {
				outfit.elements = outfit.expand.elements;
				delete outfit.expand;
			} else {
				console.warn('Expand field not found for outfit:', outfit);
			}
		}

		return outfits;
	} catch (error) {
		console.error('Error fetching outfits:', error);
		return { items: [], error };
	}
}
