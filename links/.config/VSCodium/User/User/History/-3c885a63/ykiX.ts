import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { findUserByUsername, type User } from './db/user';

/**
 * Authenticates a user based on the provided JWT token.
 */
async function auth(token: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    if (!token) reject({ error: 'No token was provided!' });
    try {
      jwt.verify(token, env.JWT_SECRET as string, async (err, decoded: unknown) => {
        if (err) return reject({ error: err });
        try {
          const users = await findUserByUsername(decoded as string);
          if (!users || users.length === 0) reject({ error: 'User not found' });
          if (users && users.length > 0) {
            resolve(users[0]);
          } else {
            reject({ error: 'User not found' });
          }
        } catch (error) {
          console.error('Error finding user:', error);
          reject({ error: 'User not found' });
        }
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      reject({ error: 'Error verifying token' });
    }
  });
}

function generateAccessToken(username: string): string {
  return jwt.sign(username, env.JWT_SECRET as string);
}

export { auth, generateAccessToken };
