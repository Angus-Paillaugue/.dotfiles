import { updateOutfit } from '$lib/db/outfit';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id } }) {
  return { id };
};


/** @type {import('./$types').Actions} */
export const actions = {
	async save({ request, params: { id: outfitId } }) {
		const formData = await request.formData();
		const items = formData.getAll('items[]');

		if (!items || items.length === 0) {
			return fail(400, { error: 'Please provide at least one item!' });
		}

    
	}
};
