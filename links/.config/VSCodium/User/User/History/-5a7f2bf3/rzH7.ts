import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [
				// search up for workspace root
				searchForWorkspaceRoot(process.cwd()),
				'songs'
			]
		}
	},
	build: {
		watch: {
			exclude: ['songs/*', 'songs/**', 'songs/**/*', 'songs/**/**', 'songs']
		},
		
	}
});
