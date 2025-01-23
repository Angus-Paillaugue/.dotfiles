import { fail, redirect } from "@sveltejs/kit";
import { createOutfit } from '$lib/db/outfit';

/** @type {import('./$types').Actions} */
export const actions = {
	createOutfit: async ({ request, locals: { user } }) => {
		const formData = await request.formData();
    const items = formData.getAll('items[]');

    if(!items || items.length === 0) {
      return fail(400, { error: 'Please provide at least one item!' });
    }

    const name = formData.get('name');
    let outfit;
    try {
      outfit = await createOutfit({ items, name, user });
    } catch (error) {
      return fail(400, { error: error.message });
    }

    return { success: true, message: 'Outfit created successfully' };
	}
};
