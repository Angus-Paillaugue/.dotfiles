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

    // Form error handling
    if (!name) return { message: 'create.item.noName', type: 'save' };
    if (name.length > 30) return { message: 'create.item.nameTooLong', type: 'save' };
    if (color.length === 0) return { message: 'create.item.noColor', type: 'save' };
    if (type == undefined) return { message: 'create.item.noType', type: 'save' };
    if (!brand) return { message: 'create.item.noBrand', type: 'save' };
    if (!image.size === 0) return { message: 'create.item.noImage', type: 'save' };
    if (formEntries.image.size === 0) delete formEntries.image;

    try {
      const item = await getItem(itemId);
      let updatedItem = Object.assign(item, {
        brand,
        name,
        type,
        color,
        description,
        link
      });
      // Removing background from image
      if (image.size !== 0) item.image = image;

      await locals.pb.collection('items').update(item.id, updatedItem);

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
