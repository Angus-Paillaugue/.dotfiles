import { getItem } from '$lib/db/item';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id }}) {
  const item = await getItem(id);
  return { item };
};
