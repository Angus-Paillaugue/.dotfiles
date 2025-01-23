import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [sveltekit(), viteCompression()],
  build: {
    rollupOptions: {
      external: ['$lib/utils'] // Mark the path as external
    }
  }
});
