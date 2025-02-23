import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
	plugins: [sveltekit(), viteCompression(), svelteTesting()],
	test: {
		environment: 'jsdom',
		include: ['tests/unit/**/*.test.js'],
		setupFiles: ['tests/unit/vitest-setup.js']
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
