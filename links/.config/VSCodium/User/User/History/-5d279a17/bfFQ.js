import { getOutfit } from '$lib/db/outfit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id } }) {

  const outfit = await getOutfit(id);

  return { outfit };
};
