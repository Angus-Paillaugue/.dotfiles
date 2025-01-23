import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { findUserByUsername, type User } from './db/user';

/**
 * Authenticates a user based on the provided JWT token.
 */
async function auth(token: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    if (!token) reject({ error: 'No token was provided!' });
    const decoded =  await jwt.verify(token, JWT_SECRET);
    if (!decoded) return reject({ error: "" });
    try {
      const user = await findUserByUsername(decoded as string);
      resolve(user);
    } catch (error) {
      console.error('Error finding user:', error);
      reject({ error: 'User not found' });
    }
  });
}

function generateAccessToken(username: string): string {
  return jwt.sign(username, JWT_SECRET);
}

export { auth, generateAccessToken };
