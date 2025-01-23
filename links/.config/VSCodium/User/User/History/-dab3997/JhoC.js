import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), viteCompression()]
});
