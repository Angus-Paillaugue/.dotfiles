import { locale } from 'svelte-i18n';
import { urlStartsWith } from '$lib/utils';

const protectedUrls = ['/note'];

export const handle = async ({ event, resolve }) => {
	const { url, request } = event;

	const lang = request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	const response = await resolve(event);
	response.headers.set(
		'X-Robots-Tag',
		urlStartsWith(url.pathname, protectedUrls) ? 'noindex, nofollow' : 'index, follow'
	);

	return response;
};
