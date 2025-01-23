import { pb } from '$lib/db';

const outfitCollection = pb.collection('outfit');

export async function getUserOutfits({ user, page = 0}) {
  const NUMBER_OF_OUTFITS_PER_PAGE = 25;

  const outfits = await outfitCollection.getFullList({
		sort: '-created',
		expand: 'elements',
		filter: `owner = '${user.id}'`,
		limit: NUMBER_OF_OUTFITS_PER_PAGE,
		offset: page * NUMBER_OF_OUTFITS_PER_PAGE
	});

	console.log(outfits);
  for (const i in outfits) {
		if (outfits[i].expand?.elements) {
			outfits[i].elements = outfits[i].expand.elements;
			delete outfits[i].expand;
		}
	}

  return outfits;
}
