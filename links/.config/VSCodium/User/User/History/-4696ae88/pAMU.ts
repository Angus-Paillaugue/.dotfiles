export const actions: Actions = {
	logIn: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, password } = formData;
	}
};
