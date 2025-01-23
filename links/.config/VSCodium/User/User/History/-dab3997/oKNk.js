import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import Unlighthouse from '@unlighthouse/vite';


export default defineConfig({
	plugins: [
		sveltekit(),
		viteCompression(),
		Unlighthouse({
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
		})
	]
});
