import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { generateAccessToken } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '$lib/server/db/user';

export const actions: Actions = {
  async login({ cookies, request }) {
    console.log('1');
    const formData = Object.fromEntries(await request.formData());
    console.log('2');
    const { username, password } = formData as { username: string; password: string };
    console.log('3');

    // Check if username is provided
    if (!username) return fail(400, { error: 'Please enter a username!' });
    console.log('4');

    // Check if password is provided
    if (!password) return fail(400, { error: 'Please enter a password!' });
    console.log('5');

    try {
      const user = await findUserByUsername(username);
      console.log('6');

      // If user does not exist, return error
      if (!user) return fail(400, { error: 'No account with this username!' });
      console.log('7');

      const compare = await bcrypt.compare(password, user.passwordHash);
      console.log('8');

      // If password is incorrect, return error
      if (!compare) return fail(400, { error: 'Incorrect password!' });
      console.log('9');

      cookies.set('token', generateAccessToken(username), {
        path: '/',
        maxAge: 60 * 60 * 24,
        secure: false
      });
      console.log('10');
    } catch (error) {
      console.log('11');
      console.error(error);
      return fail(400, { error: 'An error occurred!' });
    }

    console.log('12');
    throw redirect(303, '/app');
  }
};
