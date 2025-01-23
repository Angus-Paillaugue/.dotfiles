import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { generateAccessToken } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { findUserByUsername } from '$lib/server/db/user';

export const actions: Actions = {
  async login({ cookies, request }) {
    const formData = Object.fromEntries(await request.formData());
    const { username, password } = formData as { username: string; password: string };

    // Check if username is provided
    if (!username) return fail(400, { error: 'Please enter a username!' });
        const usernameIsAlreadyUsed = await usernameIsTaken(username);

        if (usernameIsAlreadyUsed) return fail(400, { error: 'Username is taken!' });

    // Validate username (only letters and numbers)
    if (!/^[a-zA-Z0-9]+$/.test(username))
      return fail(400, {
        error: 'Username can only contain letters and numbers!'
      });

    // Validate username (at least 3 characters long)
    if (username.length < 3)
      return fail(400, {
        error: 'Username must be at least 3 characters long!'
      });

    // Validate username (at most 20 characters long)
    if (username.length > 20)
      return fail(400, {
        error: 'Username must be at most 20 characters long!'
      });

    // Check if password is provided
    if (!password) return fail(400, { error: 'Please enter a password!' });

    try {
      const user = await findUserByUsername(username);

      // If user does not exist, return error
      if (!user) return fail(400, { error: 'No account with this username!' });

      const compare = bcrypt.compareSync(password, user.passwordHash);

      // If password is incorrect, return error
      if (!compare) return fail(400, { error: 'Incorrect password!' });

      cookies.set('token', generateAccessToken(username), {
        path: '/',
        maxAge: 60 * 60 * 24,
        secure: false
      });
    } catch (error) {
      console.error(error);
      return fail(400, { error: 'An error occurred!' });
    }

    throw redirect(303, '/app');
  }
};
