import { updateOutfit } from '$lib/db/outfit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id } }) {
  return { id };
};


/** @type {import('./$types').Actions} */
export const actions = {
  async save({ params:{ id:outfitId } }) {

  }
};
