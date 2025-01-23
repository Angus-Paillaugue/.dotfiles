import { getUserByUsername } from "$lib/db/user";
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	logIn: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, password } = formData as { username: string; password: string };

    const fetchedUser = await getUserByUsername(username);

    if(!fetchedUser) {
      return fail
    }
	}
};
