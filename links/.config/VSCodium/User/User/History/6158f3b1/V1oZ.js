import { addTranslations, setLocale, setRoute } from '$lib/i18n';
import { browser } from '$app/environment';


/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ data }) => {
	const { i18n, translations } = data;
	let { locale, route } = i18n;

	if (browser && window.navigator.language !== locale) {
		locale = window.navigator.language.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
	}

	addTranslations(translations);

	await setRoute(route);
	await setLocale(locale);

	return i18n;
};
