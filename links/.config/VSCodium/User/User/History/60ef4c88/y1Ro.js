import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';


export const handle = async ({ event, resolve }) => {
	const { url, cookies, locals } = event;
	const token = cookies.get('token') || false;

	// Check if the user is logged in, and if so, retrieve the user data
	if (token) {
		const user = await auth(token);

		if (!user.error) {
			locals.user = user;
		} else {
			cookies.delete('token', { path: '/' });
			locals.user = undefined;
			if (!url.pathname === '/') throw redirect(307, '/');
		}
	}

	// User is not logged in and trying to access a protected route
	if (
		(urlStartsWith(url.pathname, '/app') || urlStartsWith(url.pathname, '/api')) &&
		!locals?.user
	) {
		cookies.delete('token', { path: '/' });
		throw redirect(307, '/');
	}

	// User is logged in and trying to access a public route
	if (
		!urlStartsWith(url.pathname, '/app') &&
		!urlStartsWith(url.pathname, '/api') &&
		!urlStartsWith(url.pathname, '/profile_picture/') &&
		locals?.user
	) {
		throw redirect(307, '/app');
	}

	// User is logged in and trying to access an admin route without admin privileges
	if (urlStartsWith(url.pathname, '/app/account/admin') && !locals?.user.admin) {
		throw redirect(307, '/app/account');
	}

	const response = await resolve(event);
	response.headers.set(
		'X-Robots-Tag',
		urlStartsWith(url.pathname, PROTECTED_ROUTES) ? 'noindex, nofollow' : 'index, follow'
	);

	return response;
};
