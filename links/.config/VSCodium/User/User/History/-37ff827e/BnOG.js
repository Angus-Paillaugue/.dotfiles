import { json } from '@sveltejs/kit'
import { getUserItems } from '$lib/db/item';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals: { user }, url }) {
  console.log('url', url);

  const currentPage = Number(url.searchParams.get('page')) || 0;

	const items = await getUserItems({ user, page: currentPage });

  return json({ items });
};
