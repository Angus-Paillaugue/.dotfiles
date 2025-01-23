import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(301, '/app');
}

export const actions = {
	login: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, password } = formData;

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (_) {
			return fail(400, {
				message: 'Invalid email or password.'
			});
		}
		throw redirect(303, '/u');
	}
};
