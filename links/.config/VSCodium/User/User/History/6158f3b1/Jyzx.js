import { addTranslations, setLocale, setRoute, locales, defaultLocale } from '$lib/i18n';
import { browser } from '$app/environment';


/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ data }) => {
	const { i18n, translations } = data;
	let { locale, route } = i18n;

	let navigatorLocale = browser
		? `${window.navigator.language.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase()
		: locale;
	if (navigatorLocale !== locale) {
		const supportedLocales = locales.get().map((l) => l.toLowerCase());
		if (!supportedLocales.includes(locale)) {
			locale = defaultLocale;
		}else {
			locale = navigatorLocale;
		}
	}

	addTranslations(translations);
	console.log(navigatorLocale);

	await setRoute(route);
	await setLocale(locale);

	return i18n;
};
