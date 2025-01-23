import { redirect, fail } from '@sveltejs/kit';
import { isValidEmail } from '$lib/utils';

export const actions = {
	login: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, password } = formData;

		if (!email || !isValidEmail(email)) {
			return fail(400, { error: 'Invalid email.' });
		}

		try {
			await locals.pb.collection('user').authWithPassword(email, password);
		} catch (_) {
			return fail(400, {
				error: 'Invalid email or password.'
			});
		}
		throw redirect(303, '/app');
	}
};
