import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [sveltekit(), viteCompression()],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        docsUrlStart
      ]
    }
  }
});
