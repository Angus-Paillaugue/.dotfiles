import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { config } from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsx(mdsvexConfig), vitePreprocess()],
  kit: {
    adapter: adapter()
  }
};

export default config;
