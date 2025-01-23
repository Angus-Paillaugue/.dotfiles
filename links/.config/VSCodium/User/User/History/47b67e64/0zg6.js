import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const { url, cookies, locals } = event;

	const token = cookies.get('token') || false;

	console.log(!url.pathname.startsWith('/app'), locals.user);
	
	if (token) {
		const user = await auth(token);
		if (!user.error) {
			locals.user = user;
		} else {
			cookies.delete('token', { path: '/' });
			locals.user = undefined;
			throw redirect(307, '/log-in');
		}
	} else if (url.pathname.startsWith('/app')) {
		locals.user = undefined;
		throw redirect(307, '/log-in');
	}else if(!url.pathname.startsWith('/app') && locals.user){
		throw redirect(307, '/app');
	}

	return resolve(event);
};
