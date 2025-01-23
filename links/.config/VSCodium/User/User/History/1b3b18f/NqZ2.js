import { generateAccessToken } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { createNewUser, isUsernameTaken } from '$lib/server/db/user.js';
import bcrypt from 'bcrypt';

export const actions = {
	signUp: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { signUpUsername: username, signUpPassword: password } = formData;

		// Check if username is already used
		const usernameIsAlreadyUsed = await isUsernameTaken(username);

		if (usernameIsAlreadyUsed)
			return fail(400, { error: 'Username is already taken!' });

		// Validate username (only letters and numbers)
		if (!/^[a-zA-Z0-9]+$/.test(username))
			return fail(400, {
				error: 'Username can only contain letters and numbers!'
			});

		// Validate username (at least 3 characters long)
		if (username.length < 3)
			return fail(400, {
				error: 'Username must be at least 3 characters long!'
			});

		// Validate password (at least 6 characters long)
		if (password.length < 6)
			return fail(400, {
				error: 'Password must be at least 6 characters long!'
			});

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		// Create user
		await createNewUser(username, hash);

		// Set token
		cookies.set('token', generateAccessToken(username), {
			path: '/',
			maxAge: 60 * 60 * 24,
			secure: false
		});

		throw redirect(303, '/app');
	}
};
