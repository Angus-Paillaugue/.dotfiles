import { generateAccessToken } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { findUserByUsername } from '$lib/server/db/user.js';
import bcrypt from 'bcrypt';

export const actions = {
	logIn: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { logInUsername: username, logInPassword: password } = formData;

		// Check if username is provided
		if (!username) return fail(400, { error: 'Please provide a username!' });

		// Check if the username is at least 3 characters long
		if (username.length < 3)
			return fail(400, { error: "Username must be at least 3 characters long!"});

		// Check if password is provided and is at least 6 characters long
		if (!password || password.length < 6)
			return fail(400, { error: 'Incorrect password!' });

		try {
			const user = await findUserByUsername(username);

			// If user does not exist, return error
			if (!user)
				return fail(400, { error: '	No account with this username!' });

			const compare = await bcrypt.compare(password, user.password_hash);

			// If password is incorrect, return error
			if (!compare) return fail(400, { error: 'Incorrect password!' });

			cookies.set('token', generateAccessToken(username), {
				path: '/',
				maxAge: 60 * 60 * 24,
				secure: false
			});
		} catch (error) {
			return fail(400, { error: error.message });
		}

		throw redirect(303, '/app');
	}
};
