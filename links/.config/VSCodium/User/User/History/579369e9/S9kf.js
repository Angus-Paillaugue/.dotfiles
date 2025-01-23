/** @type {import('./$types').Actions} */
export const actions = {
	createOutfit: async ({ request }) => {
		const formData = await request.formData();
		const formEntries = Object.fromEntries(formData);
    const items = formEntries.getAll('items');
    console.log(items);

	}
};
