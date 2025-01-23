import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '$env/static/private';
import { findUserByUsername } from './db/users.js';
import * as m from '$msgs';

async function auth(token: string) {
	try {
		return new Promise((resolve, reject) => {
			if (!token) reject({ error: m.auth_no_token() });
			jwt.verify(token, AUTH_TOKEN_SECRET, async (err: any, username: string) => {
				if (err) return reject({ error: err });
				try {
					const user = await findUserByUsername(username);
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

function generateAccessToken(username: string) {
	return jwt.sign(username, AUTH_TOKEN_SECRET);
}

export { auth, generateAccessToken };
