import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const { url, cookies, locals } = event;

	const token = cookies.get('token') || false;

	if (token) {
		const user = await auth(token);
		console.log(user);
		if (!user.error) {
			locals.user = user;
		} else {
			cookies.delete('token');
			throw redirect(303, '/log-in');
		}
	} else if(url.pathname !== '/log-in') {
		locals.user = false;
		if(url.pathname !== '/log-in')
		throw redirect(303, '/log-in');
	}else 

	return resolve(event);
};
