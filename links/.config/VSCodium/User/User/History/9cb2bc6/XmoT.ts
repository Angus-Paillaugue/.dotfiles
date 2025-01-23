import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { findUserByUsername } from './db/users.js';

/**
 * Authenticates a user based on the provided JWT token.
 */
async function auth(token: string): Promise<User> {
	try {
		return new Promise((resolve, reject) => {
			if (!token) reject({ error: "No token was provided!" });
			jwt.verify(token, JWT_SECRET, async (err, decoded: unknown) => {
				if (err) return reject({ error: err });
				try {
					const user = await findUserByUsername(decoded as string);
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

function generateAccessToken(username: string): string {
	return jwt.sign(username, JWT_SECRET);
}

export { auth, generateAccessToken };
