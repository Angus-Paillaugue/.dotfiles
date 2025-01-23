// @ts-nocheck
import { getUserByUsername } from "$lib/server/db/user";
import { fail, type Actions } from "@sveltejs/kit";

export const actions = {
	logIn: async ({ request }: import('./$types').RequestEvent) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, password } = formData as { username: string; password: string };

    const fetchedUser = await getUserByUsername(username);

    if(!fetchedUser) {
      return fail(404, { message: "User not found" });
    }


	}
};
;null as any as Actions;
