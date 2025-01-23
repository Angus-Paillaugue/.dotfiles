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
			key: file.filename,
			routes: file.routes,
			loader: async () => (await import(`./locales/${locale}/${file.filename}.json`)).default
		};
	})
}).flat();
console.log(JSON.stringify(loaders, null, 2));


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
	loaders: [
		{
			locale: 'en',
			key: 'sidebar',
			loader: async () => (await import('./locales/en/sidebar.json')).default
		},
		{
			locale: 'en',
			key: 'home',
			routes: ['/'],
			loader: async () => (await import('./locales/en/home.json')).default
		},
		{
			locale: 'en',
			key: 'project',
			routes: [new RegExp('^/project/[^/]+$')],
			loader: async () => (await import('./locales/en/project.json')).default
		},
		{
			locale: 'fr',
			key: 'sidebar',
			loader: async () => (await import('./locales/fr/sidebar.json')).default
		},
		{
			locale: 'fr',
			key: 'home',
			routes: ['/'],
			loader: async () => (await import('./locales/fr/home.json')).default
		},
		{
			locale: 'fr',
			key: 'project',
			routes: [new RegExp('^/project/[^/]+$')],
			loader: async () => (await import('./locales/fr/project.json')).default
		}
	]
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
