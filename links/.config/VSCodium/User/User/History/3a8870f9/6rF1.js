import { getItem } from '$lib/db/item';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id }}) {
  const item = await getItem(id);
  return { item };
};


/** @type {import('./$types').Actions} */
export const actions = {
	save: async ({ request, params: { id:itemId} }) => {
		const formEntries = Object.fromEntries(formData);
		let { brand, name, type, image, description, link } = formEntries;
		let color = formData.getAll('color[]');
	}
};
