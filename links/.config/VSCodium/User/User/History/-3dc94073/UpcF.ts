import { generateAccessToken } from "$lib/server/auth";
import { createUser, getUserByUsername } from "$lib/server/db/user";
import { isUsername } from "$lib/utils";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import bcrypt from 'bcryptjs';

export const actions: Actions = {
	signIn: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, password } = formData as { username: string; password: string };

		if (!isUsername(username)) {
			return fail(400, {
				message:
					'Invalid username. Must be only letter, numbers, "_", "-" and between 3 and 20 characters'
			});
		}

		const fetchedUser = await getUserByUsername(username);

		if (fetchedUser) {
			return fail(400, { message: 'Username already is taken' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await createUser(username, hashedPassword);

		cookies.set('token', generateAccessToken(username), {
			path: '/',
			maxAge: 60 * 60 * 24,
			secure: false
		});

		throw redirect(303, '/' + username);
	}
};
