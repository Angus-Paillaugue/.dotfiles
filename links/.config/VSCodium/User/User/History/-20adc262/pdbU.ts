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
			secure: false,
			sameSite: 'Lax',
			httpOnly: true
		}
	],
	urls: ['/', '/app/exercises/sqrt-x-31'],
	debug: true,
	scanner: {
		robotsTxt: false
	}
};
