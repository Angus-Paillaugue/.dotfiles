import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [sveltekit(), viteCompression()],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        '/docs'
      ]
    }
  },
  resolve: {
    alias: {
      $conf: path.resolve(__dirname, './project.config.js')
    }
  }
});
