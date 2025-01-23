import { getOutfit } from '$lib/db/outfit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const outfit = await getOutfit(params.id);

  return { outfit };
};
