import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './lang.json';

export const defaultLocale = 'en';
const translationFiles= [
	{
		filename:'sidebar'
	},
	{
		filename:'project',
		routes: [new RegExp('^/project/[^/]+$')]
	},
	{
		filename:'home',
		routes: ['/']
	}
];
const loaders = Object.keys(lang).map((locale) => {
	return translationFiles.map(file => {
		return {
			locale,
			key: file,
			routes: file.routes,
			loader: async () => (await import(`./locales/${locale}/${file}.json`)).default
		};
	})
})
console.log(loaders);


/** @type {import('sveltekit-i18n').Config} */
export const config = {
	fallbackLocale: defaultLocale,
	log: {
		level: dev ? 'warn' : 'error'
	},
	translations: {
		en: { lang },
		fr: { lang }
	},
	loaders
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);
