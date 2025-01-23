import { addTranslations, setLocale, setRoute } from '$lib/i18n';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ data }) => {
	const { i18n, translations } = data;
	let { locale, route } = i18n;

	if(window.navigator.language !== locale) {
		locale = window.navigator.language;
	}

	addTranslations(translations);

	await setRoute(route);
	await setLocale(locale);

	return i18n;
};
