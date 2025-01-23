import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import { createWebsocketServer } from './websocket.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);
const io = new Server(server.httpServer);

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'webSocketServer',
			configureServer(server) {
				createWebsocketServer(server);
			}
		}
	],
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
