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

		// Check if username is already used
		const [usernameIsAlreadyUsed] = await db.query(
			'SELECT username FROM users WHERE username = ?',
			[username]
		);
		if (usernameIsAlreadyUsed?.username && usernameIsAlreadyUsed.username === username)
			return fail(400, { error: 'Username is taken!' });

		// Validate username (only letters and numbers)
		if (!/^[a-zA-Z0-9]+$/.test(username))
			return fail(400, { error: 'Usernames can only be composed of letters and numbers !' });

		// Validate password (at least 6 characters long)
		if (password.length < 6)
			return fail(400, { error: 'Password must be at least 6 characters long !' });

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		// Insert user
		const [ insertedRow ] = await db.query('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [username, hash]);
		const userId = insertedRow.insertId;

		// Insert default categories
		const [defaultCategories] = await db.query('SELECT id FROM categories WHERE isDefault = 1');
		for (const { id } of defaultCategories) {
			await db.query('INSERT INTO userCategories (userId, categoryId) VALUES (?, ?)', [userId, id]);
		}

		// Set token
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
