export default {
	site: 'http://localhost:5173',
	root: './src/routes',
  discovery: {
    pagesDir: 'routes',
    fileExtensions: ['svelte'],
  },
	cookies: [
		{
			name: 'token',
			value: 'eyJhbGciOiJIUzI1NiJ9.QW5ndXM.ZvCIdf57B1jZW1pnZ0w2XmJ7HQvSBiqY8B5knZOtzsk'
		}
	]
};
