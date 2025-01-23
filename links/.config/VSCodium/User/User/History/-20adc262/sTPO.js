export default {
	cookies: [
		{
			name: 'my-jwt-token',
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
