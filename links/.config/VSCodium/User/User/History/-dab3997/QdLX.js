import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import Unlighthouse from '@unlighthouse/vite';


export default defineConfig({
	plugins: [
		Unlighthouse({
			auth: {
				username: 'Angus',
				password: 'APAILL40'
			}
		}),
		sveltekit(),
		viteCompression(),
	]
});
