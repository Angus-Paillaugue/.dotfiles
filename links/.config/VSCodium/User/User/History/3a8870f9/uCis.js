import { getItem, updateItem } from '$lib/db/item';

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
    if (!name) return { message: 'Please provide a name!', type: 'save' };
    if (name.length > 30) return { message: 'Please provide a', type: 'save' };
    if (color.length === 0) return { message: 'Please provide a', type: 'save' };
    if (type == undefined) return { message: 'Please provide a', type: 'save' };
    if (!brand) return { message: 'Please provide a brand!', type: 'save' };
    if (!image.size === 0) return { message: 'Please provide an image', type: 'save' };
    if (formEntries.image.size === 0) delete formEntries.image;

    try {
      const item = await getItem(itemId);
      // Removing background from image
      if (image.size !== 0) item.image = image;

      await updateItem(item.id, {
				brand,
				name,
				type,
				color,
				description,
				link
			});

      const bdItem = await getItem(itemId);
      return { updatedItem: bdItem, success: true, message: 'Saved!' };
    } catch (error) {
      console.log(error);
      return {
        message:
          Object.values(error?.response?.data ?? [])
            .map((el) => el.message)
            .join('<br>') || 'Error!',
        success: false,
        text: error?.response?.data ? 'raw' : '',
        type: 'updateItem'
      };
    }
	}
};
