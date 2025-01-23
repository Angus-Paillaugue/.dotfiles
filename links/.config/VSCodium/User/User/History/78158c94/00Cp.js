import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'log-request-middleware',
			configureServer(server) {
				// Middleware to allow the @imgly/background-removal module to work better
				server.middlewares.use((req, res, next) => {
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					next();
				});
			}
		}
	],
	build: {
		manifest: true,
		rollupOptions: {
			external: ['pb/']
		}
	}
});
