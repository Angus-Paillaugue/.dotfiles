import { fail, redirect } from "@sveltejs/kit";
import { createOutfit } from '$lib/db/outfit';

/** @type {import('./$types').Actions} */
export const actions = {
	createOutfit: async ({ request }) => {
		const formData = await request.formData();
    const items = formData.getAll('items[]');
    console.log(items);

    if(!items || items.length === 0) {
      return fail({ error: 'Please provide at least one item!' });
    }

    const name = formData.get('name');
    try {
      const outfit = await createOutfit({ items, name });
      return redirect(`/app/(main)/create/outfit/${outfit.id}`);
    } catch (error) {
      return fail({ error: error.message });
    }

	}
};
