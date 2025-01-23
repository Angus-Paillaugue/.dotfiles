import { json } from '@sveltejs/kit'
import { getUserOutfits } from '$lib/db/outfit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals: { user }, url }) {
  const currentPage = Number(url.searchParams.get('page')) || 0;

	const outfits = await getUserOutfits({ user, page: currentPage });

  return json(outfits);
};
