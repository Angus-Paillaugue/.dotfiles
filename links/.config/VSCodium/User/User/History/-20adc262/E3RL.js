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
			domain: 'http://localhost:5173',
			path: '/',
			httpOnly: false,
			secure: false,
			sameSite: 'Lax'
		}
	],
	urls: ['/', '/app/exercises'],
	debug: true,
	// only run a single scan at a time
	// puppeteerClusterOptions: {
	// 	maxConcurrency: 1
	// }

	// scanner: {
	// 	robotsTxt: false
	// }
};
