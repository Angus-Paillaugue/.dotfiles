import { updateOutfit } from '$lib/db/outfit';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id } }) {
  return { id };
};


/** @type {import('./$types').Actions} */
export const actions = {
	async save({ request, params: { id: outfitId }, locals: { user } }) {
		const formData = await request.formData();
		const items = formData.getAll('items[]');
    console.log();


		if (!items || items.length === 0) {
			return fail(400, { error: 'Please provide at least one item!' });
		}

		const name = formData.get('name');
		try {
			const outfit = await updateOutfit({ items, name, user, id: outfitId });
      console.log(outfit);
      
      return { success: true, message: 'Outfit created successfully', outfit };
		} catch (error) {
			return fail(400, { error: error.message });
		}
	}
};
