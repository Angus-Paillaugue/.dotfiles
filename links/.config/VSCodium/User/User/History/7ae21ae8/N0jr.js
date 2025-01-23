import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';
import { i18n } from '$conf';

const defaultLocale = i18n.defaultLocale ?? 'en';

for (const [locale, data] of Object.entries(i18n.locales)) {
	console.log(locale, data);

	register(locale, () => import(`../locales/${locale}.json`));
}

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
	handleMissingMessage: (key) => {
		return key.id.split('.').pop();
	}
});
