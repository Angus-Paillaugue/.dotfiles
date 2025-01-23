import { json } from '@sveltejs/kit'
import { getItem } from '$lib/db/item';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const itemId = url.searchParams.get('id');
  if(!itemId) return json({ error: 'No item id provided' }, { status: 400 });

	const item = await getItem(itemId);

  return json(item);
};
