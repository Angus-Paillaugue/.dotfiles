import { createConnection } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, password } = formData;
		const db = await createConnection();

		const [usernameIsAlreadyUsed] = await db.query('SELECT username FROM users WHERE username = ?', [username]);
		console.log(usernameIsAlreadyUsed);

		// if (usernameIsAlreadyUsed)
		// 	return fail(400, { error: 'signUp.form.errors.usernameTaken' });

		// if (!/^[a-zA-Z0-9]+$/.test(username))
		// 	return fail(400, { error: 'signUp.form.errors.invalidUsernameFormat' });

		// if (password.length < 6)
		// 	return fail(400, { error: 'signUp.form.errors.passwordTooShort' });

		// const salt = await bcrypt.genSalt(10);
		// const hash = await bcrypt.hash(password, salt);
		// await usersRef.insertOne({ username, password: hash });

		// cookies.set('token', generateAccessToken(username), {
		// 	path: '/',
		// 	maxAge: 60 * 60 * 24,
		// 	secure: false
		// });

		// throw redirect(303, '/');
	}
};

function generateAccessToken(email) {
	return jwt.sign(email, AUTH_TOKEN_SECRET);
}
