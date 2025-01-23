import { fail } from "@sveltejs/kit"

/** @type {import('./$types').Actions} */
export const actions = {
	createOutfit: async ({ request }) => {
		const formData = await request.formData();
    const items = formData.getAll('items[]');
    console.log(items);

    if(!items || items.length === 0) {
      return fail({ error: 'Please provide at least one item!' });
    }

	}
};
