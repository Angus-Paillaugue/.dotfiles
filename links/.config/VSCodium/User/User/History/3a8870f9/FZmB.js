import { getItem, updateItem } from '$lib/db/item';
import { fail } from "@sveltejs/kit"

/** @type {import('./$types').PageServerLoad} */
export async function load({ params: { id }}) {
  const item = await getItem(id);
  return { item };
};


/** @type {import('./$types').Actions} */
export const actions = {
	save: async ({ request, params: { id:itemId} }) => {
    const formData = await request.formData();
		const formEntries = Object.fromEntries(formData);
		let { brand, name, type, image, description, link } = formEntries;
		let color = formData.getAll('color[]');

    // Form error handling
    if (!name) return fail(400, { error: 'Please provide a name!', type: 'save' });
    if (color.length === 0) return fail(400, { error: 'Please provide a color!', type: 'save' });
    if (type == undefined) return fail(400, { error: 'Please provide a type!', type: 'save' });
    if (!brand) return fail(400, { error: 'Please provide a brand!', type: 'save' });
    if (!image.size === 0) return fail(400, { error: 'Please provide an image!', type: 'save' });
    if (formEntries.image.size === 0) delete formEntries.image;

    try {
      const bdItem =  await updateItem(itemId, {
				brand,
				name,
				type,
				color,
				description,
				link
			});
      return { updatedItem: bdItem, success: true, message: 'Saved!' };
    } catch (error) {
      console.log(error);
      return fail(500, {
        error:
          Object.values(error?.response?.data ?? [])
            .map((el) => el.message)
            .join('<br>') || 'Error!',
        type: 'save'
      });
    }
	}
};
