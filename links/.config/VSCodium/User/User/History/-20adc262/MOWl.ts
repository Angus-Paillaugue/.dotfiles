export default {
	site: 'http://localhost:5173',
	// discovery: {
	// 	pagesDir: 'src/routes',
	// 	fileExtensions: ['svelte']
	// },
	cookies: [
		{
			name: 'token',
			value: 'test',
			path: '/',
			secure: false,
			sameSite: 'None'
		}
	],
	urls: ['/', '/app/exercises/sqrt-x-31'],
	debug: true,
	scanner: {
		robotsTxt: false
	}
};
