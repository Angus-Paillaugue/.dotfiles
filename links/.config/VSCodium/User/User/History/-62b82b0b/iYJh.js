import { redirect, fail } from '@sveltejs/kit';
import { isValidEmail } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(301, '/u');
}

export const actions = {
	signin: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, username, password } = formData;

		const isASCII = (str) => {
			// eslint-disable-next-line no-control-regex
			return new RegExp(/^[\x00-\x7F]*$/).test(str);
		};

		if (!email || !isValidEmail(email)) {
			return fail(400, { message: 'Invalid e-mail' });
		}

		if (!isASCII(username) || username.includes(' '))
			return fail(400, {
				success: false,
				message: 'Username must only contain letters and numbers!'
			});
		if (username.length < 4) return fail(400, { success: false, message: 'Username must be at least 4 characters long' });
		if (password.length < 6) return fail(400, { success: false, message: 'Password must be at least 6 characters long!' });

		try {
			await locals.pb
				.collection('users')
				.create({ username, email, password, passwordConfirm: password });

			await locals.pb.collection('users').requestVerification(email);
			throw redirect(303, '/app');
		} catch (error) {
			return fail(400, {
				message: (
					(Object.values(error?.response?.data ?? {}).length === 0
						? [{ message: 'An error occurred' }]
						: Object.values(error?.response?.data)) ?? [{ message: 'An error occurred' }]
				)
					.map((el) => el.message)
					.join('<br>')
			});
		}
	}
};
