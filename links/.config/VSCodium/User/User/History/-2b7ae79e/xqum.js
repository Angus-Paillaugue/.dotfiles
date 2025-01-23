import { urlStartsWith } from '$lib/utils';
import { createInstance } from '$lib/db';
import { redirect } from '@sveltejs/kit';

const PROTECTED_ROUTES = [
	'/app',
	'/api'
];

/**
 * Handles the incoming request and performs necessary operations.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.event - The event object containing the request details.
 * @param {Function} options.resolve - The resolve function to continue processing the request.
 * @returns {Promise<Object>} A promise that resolves to the processed event object.
 */
export const handle = async ({ event, resolve }) => {
	const { url, locals, request } = event;
	const pb = createInstance();

	// load the store data from the request cookie string
	pb.authStore.loadFromCookie(request.headers.get('cookie') || '');
	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		if (pb.authStore.isValid) {
			await pb.collection('user').authRefresh();
		}
	} catch (_) {
		// clear the auth store on failed refresh
		pb.authStore.clear();
	}

	locals.pb = pb;
	locals.user = pb.authStore.model;

	if(!locals.user && urlStartsWith(url.pathname, PROTECTED_ROUTES)) {
		throw redirect(302, '/log-in');
	}else if(locals.user && !urlStartsWith(url.pathname, PROTECTED_ROUTES)) {
		throw redirect(302, '/app');
	}

	const response = await resolve(event);
	response.headers.set(
		'X-Robots-Tag',
		urlStartsWith(url.pathname, PROTECTED_ROUTES) ? 'noindex, nofollow' : 'index, follow'
	);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
