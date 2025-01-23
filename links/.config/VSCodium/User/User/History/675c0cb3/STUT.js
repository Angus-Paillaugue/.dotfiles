import { getUserItems } from '$lib/db/item';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { user }, url}) {
  const currentPage = Number(url.searchParams.get('page')) || 0;

  const items = await getUserItems({ user, page: currentPage });
  console.log(items);
  return { items };
};
