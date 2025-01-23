import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';



export const actions: Actions = {
  async logIn({ cookies, request }) {
    const formData = Object.fromEntries(await request.formData());
    const { logInUsername: username, logInPassword: password } = formData;

    // Check if username is provided
    if (!username) return fail(400, { error: m.error_messages_log_in_no_username() });

    // Check if the username is at least 3 characters long
    if (username.length < 3)
      return fail(400, { error: m.error_messages_log_in_username_too_short({ length: 3 }) });

    // Check if password is provided and is at least 6 characters long
    if (!password || password.length < 6)
      return fail(400, { error: m.error_messages_log_in_incorrect_password() });

    try {
      const user = await findUserByUsername(username);

      // If user does not exist, return error
      if (!user)
        return fail(400, { error: m.error_messages_log_in_no_account_with_provided_username() });

      const compare = await bcrypt.compare(password, user.password_hash);

      // If password is incorrect, return error
      if (!compare) return fail(400, { error: m.error_messages_log_in_incorrect_password() });

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
