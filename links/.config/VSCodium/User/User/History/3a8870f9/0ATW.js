import { getItem } from '$lib/db/item';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id }}) {
  const item = await getItem(id);
  return { item };
};


/** @type {import('./$types').Actions} */
export const actions = {
	save: async ({ request, params: { id:itemId} }) => {
		const formData = Object.fromEntries(await request.formData());
		console.log(itemId, formData);
	}
};
