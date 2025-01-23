import { redirect, fail } from '@sveltejs/kit';
import { isValidEmail } from '$lib/utils';

export const actions = {
	signin: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, username, password } = formData;

		const isASCII = (str) => {
			// eslint-disable-next-line no-control-regex
			return new RegExp(/^[\x00-\x7F]*$/).test(str);
		};

		if (!email || !isValidEmail(email)) {
			return fail(400, { error: 'Invalid e-mail' });
		}

		if (!isASCII(username) || username.includes(' '))
			return fail(400, {
				error: 'Username must only contain letters and numbers!'
			});
		if (username.length < 4) return fail(400, { error: 'Username must be at least 4 characters long' });
		if (password.length < 6) return fail(400, { error: 'Password must be at least 6 characters long!' });

		try {
			await locals.pb
				.collection('users')
				.create({ username, email, password, passwordConfirm: password });

			await locals.pb.collection('users').requestVerification(email);
			throw redirect(303, '/app');
		} catch (error) {
			return fail(400, {
				error: (
					(Object.values(error?.response?.data ?? {}).length === 0
						? [{ error: 'An error occurred' }]
						: Object.values(error?.response?.data)) ?? [{ error: 'An error occurred' }]
				)
					.map((el) => el.message)
					.join('<br>')
			});
		}
	}
};
