import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { generateAccessToken } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '$lib/server/db/users.js';


export const actions: Actions = {
  async logIn({ cookies, request }) {
    const formData = Object.fromEntries(await request.formData());
    const { username, password } = formData as { username: string; password: string };

    // Check if username is provided
    if (!username) return fail(400, { error: "Please enter a username!" });

    // Check if password is provided
    if (!password)
      return fail(400, { error: "Please enter a password!" });

    try {
      const user = await findUserByUsername(username);

      // If user does not exist, return error
      if (!user)
        return fail(400, { error: "No account with this username!" });

      const compare = await bcrypt.compare(password, user.password_hash);

      // If password is incorrect, return error
      if (!compare) return fail(400, { error: "Incorrect password!" });

      cookies.set('token', generateAccessToken(username), {
        path: '/',
        maxAge: 60 * 60 * 24,
        secure: false
      });
    } catch (error) {
      return fail(400, { error: error.message });
    }

    throw redirect(303, '/app');
  }
};
