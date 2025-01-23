import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		watch: {
			exclude: ['songs/*', 'songs/**', 'songs/**/*', 'songs/**/**', 'songs']
		}
	}
});
