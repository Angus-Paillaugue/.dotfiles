export default {
	site: 'http://localhost:5173',
	cookies: [
		{
			name: 'token',
			value: '<token>',
			// optional extras
			domain: 'your-site.com',
			path: '/',
			httpOnly: false,
			secure: false,
			sameSite: 'Lax'
		}
	]
};
