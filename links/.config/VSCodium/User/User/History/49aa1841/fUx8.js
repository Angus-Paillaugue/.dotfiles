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

export async function createOutfit({ user, items, name }) {
	if(!items || items.length === 0) {
		throw new Error('Please provide at least one item!');
	}
	if(!name) {
		throw new Error('Please provide a name!');
	}
	if(items.length > 10) {
		throw new Error('You can only have up to 10 items in an outfit!');
	}
	if(name.length > 100) {
		throw new Error('The name of the outfit is too long!');
	}
	if(!user) {
		throw new Error('Please provide a user!');
	}
	const outfit = await pb.collection('outfit').create({
		owner: user.id,
		elements: items,
		name
	});

	return outfit;
}
