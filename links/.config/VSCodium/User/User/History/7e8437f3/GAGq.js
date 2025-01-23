import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;

	const token = cookies.get('token') || false;
	if (token) {
		const user = await auth(token);
		if (!user.error) {
			locals.user = user;
		} else {
			cookies.delete('token');
			throw redirect(303, '/log-in');
		}
	} else {
		locals.user = false;
	}

	return resolve(event);
};
