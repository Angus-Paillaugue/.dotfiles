import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$msgs: 'src/paraglide/messages.js'
		}
	},
	preprocess: vitePreprocess()
};
export default config;
