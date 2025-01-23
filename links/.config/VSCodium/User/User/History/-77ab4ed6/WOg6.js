import { locale } from 'svelte-i18n';

export const handle = request } = event;

	const lang = request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	return response;
};
