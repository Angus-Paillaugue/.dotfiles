import { json } from '@sveltejs/kit'
import { getOutfit } from '$lib/db/outfit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const itemId = url.searchParams.get('id');

  if(!itemId) return json({ error: 'No item id provided!' }, { status: 400 });

	const outfit = await getOutfit(itemId);

  return json(outfit);
};
