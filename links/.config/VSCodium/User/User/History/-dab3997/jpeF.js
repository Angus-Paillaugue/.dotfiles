import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import Unlighthouse from '@unlighthouse/vite';


export default defineConfig({
	plugins: [
		sveltekit(),
		viteCompression(),
		Unlighthouse({
			auth: {
				username: 'Angus',
				password: 'APAILL40'
			}
		})
	]
});
