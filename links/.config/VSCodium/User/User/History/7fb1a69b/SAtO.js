import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';
import { findByUsername } from './db/user.js';

/**
 * Authenticates a user based on the provided JWT token.
 *
 * @param {string} token - The JWT token to be verified.
 * @returns {Promise<Object>} A promise that resolves to the user object without the password hash,
 *                            or an error object if authentication fails.
 * @throws {Object} An error object if the token is not provided or if there is an issue with the database query.
 */
async function auth(token) {
	try {
		return new Promise((resolve, reject) => {
			if (!token) reject({ error: '	jwt must be provided' });
			jwt.verify(token, AUTH_TOKEN_SECRET, async (err, username) => {
				if (err) return reject({ error: err });
				try {
					const user = await findByUsername(username);
					resolve(user);
				} catch (error) {
					return reject({ error });
				}
			});
		}).catch((err) => {
			return { error: err };
		});
	} catch (err) {
		return { error: err };
	}
}

function generateAccessToken(username) {
	return jwt.sign(username, AUTH_TOKEN_SECRET);
}

export { auth, generateAccessToken };
