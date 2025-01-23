import { redirect, fail } from '@sveltejs/kit';
import { isValidEmail } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(301, '/app');
}

export const actions = {
	login: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, password } = formData;

		if (!email || !isValidEmail(email)) {
			return fail(400, { error: 'Invalid email.' });
		}

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (_) {
			console.log(_);

			return fail(400, {
				error: 'Invalid email or password.'
			});
		}
		throw redirect(303, '/app');
	}
};
