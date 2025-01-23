import { getUserOutfits } from '$lib/db/outfit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const { user } = locals;
  const outfits = await getUserOutfits({ user  });
  return { outfits  };
};
