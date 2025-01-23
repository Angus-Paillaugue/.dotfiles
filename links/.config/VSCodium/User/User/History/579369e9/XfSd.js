/** @type {import('./$types').Actions} */
export const actions = {
	createOutfit: async ({ request }) => {
		const formData = await request.formData();
		const formEntries = Object.fromEntries(formData);
    console.log(formEntries);

	}
};
