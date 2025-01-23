import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import { webSocketServer } from './websocket.js';


export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
	server: {
		fs: {
			allow: [
				// search up for workspace root
				searchForWorkspaceRoot(process.cwd())
			]
		}
	},
	resolve: {
		alias: {
			$conf: path.resolve(__dirname, './project.config.js')
		}
	}
});
