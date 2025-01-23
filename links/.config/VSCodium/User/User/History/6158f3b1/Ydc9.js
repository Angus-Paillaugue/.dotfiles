import { loadTranslations } from '$lib/i18n';
import { browser } from '$app/environment';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url }) => {
	const { pathname } = url;

	let locale = 'en'
	if (browser) locale = window.navigator.language;


	await loadTranslations(locale, pathname);
	return {};
};
