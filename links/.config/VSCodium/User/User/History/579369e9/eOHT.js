/** @type {import('./$types').Actions} */
export const actions = {
	createOutfit: async ({ request }) => {
		const formData = await request.formData();
    const items = formData.getAll('items[]');
    console.log(items);

	}
};
