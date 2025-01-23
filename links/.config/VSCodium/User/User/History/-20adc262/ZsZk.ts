export default {
	site: 'http://localhost:5173',
	// discovery: {
	// 	pagesDir: 'src/routes',
	// 	fileExtensions: ['svelte']
	// },
	cookies: [
		{
			name: 'token',
			value: 'eyJhbGciOiJIUzI1NiJ9.QW5ndXM.ZvCIdf57B1jZW1pnZ0w2XmJ7HQvSBiqY8B5knZOtzsk',
			path: '/',
			secure: false
		}
	],
	urls: ['/', '/app/exercises/sqrt-x-31'],
	debug: true,
	// only run a single scan at a time
	puppeteerClusterOptions: {
		maxConcurrency: 1
	},
	puppeteerOptions: {
		headless: false,
		slowMo: 250 // slow down interactions
	},
	scanner: {
		robotsTxt: false
	},
	hooks: {
		'puppeteer:before-goto': async (page) => {
			page.setCookie({
				name: 'token',
				value: 'eyJhbGciOiJIUzI1NiJ9.QW5ndXM.ZvCIdf57B1jZW1pnZ0w2XmJ7HQvSBiqY8B5knZOtzsk',
			})
		}
	}
};
