import { createConnection } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { username, password, email } = formData;
		if(!/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(email)) {
			return { success: false, message: 'Invalid email!' };
		}

		const db = await createConnection();
		let userExists = [];
		try {

			[userExists] = await db.query('SELECT * FROM `Users` WHERE `username` = ? LIMIT 1;', [
				username
			]);
		} catch (err) {
			console.log(err);
			return { success: false, message: err?.code ?? err.toString() };
		}

		if (userExists.length > 0)
			return { success: false, message: 'An account with this username already exists' };

		userExists = [];
		try {
			[userExists] = await db.query('SELECT * FROM `Users` WHERE `email` = ? LIMIT 1;', [
				email
			]);
		} catch (err) {
			console.log(err);
			return { success: false, message: err?.code ?? err.toString() };
		}

		if (userExists.length > 0)
			return { success: false, message: 'An account with this email already exists' };

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		try {
			await db.query('INSERT INTO `Users` (`username`, `email`, `password`) VALUES (?, ?, ?);', [
				username,
				email,
				hashedPassword
			]);
		}catch (err) {
			console.log(err);
			return { success: false, message: err?.code ?? err.toString() };
		}

		cookies.set('token', generateAccessToken(username), { path: '/', sameSite: 'strict' });
		throw redirect(307, '/problems');
	}
};

function generateAccessToken(username) {
	return jwt.sign(username, AUTH_TOKEN_SECRET);
}
