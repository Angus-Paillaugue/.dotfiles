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

		const [usernameIsAlreadyUsed] = await db.query(
			'SELECT username FROM users WHERE username = ?',
			[username]
		);

		if (usernameIsAlreadyUsed.length > 0) return fail(400, { error: 'Username is taken!' });

		if (!/^[a-zA-Z0-9]+$/.test(username))
			return fail(400, { error: 'Usernames can only be composed of letters and numbers !' });

		if (password.length < 6)
			return fail(400, { error: 'Password must be at least 6 characters long !' });

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const [ insertedRow ] = await db.query('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [username, hash]);
		const userId = insertedRow.insertId;
		const defaultCategories = await db.query('SELECT id FROM categories WHERE isDefault = 1');
		await db.query('INSERT INTO userCategories (userId, categoryId) VALUES (?, 1)', [userId]);

		cookies.set('token', generateAccessToken(username), {
			path: '/',
			maxAge: 60 * 60 * 24,
			secure: false
		});

		throw redirect(303, '/');
	}
};

function generateAccessToken(email) {
	return jwt.sign(email, AUTH_TOKEN_SECRET);
}
