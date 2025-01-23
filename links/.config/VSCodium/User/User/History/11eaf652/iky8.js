import { locale } from 'svelte-i18n';

export const handle = async ({ event, resolve }) => {
	const { request } = event;

	const lang = request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	const response = await resolve(event);
	response.headers.set(
		'X-Robots-Tag',
		'index, follow'
	);

	return response;
};
