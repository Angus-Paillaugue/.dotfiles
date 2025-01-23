import { getUserOutfits } from '$lib/db/outfit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { user } }) {
  const outfits = await getUserOutfits({ user });
  return { outfits  };
};
