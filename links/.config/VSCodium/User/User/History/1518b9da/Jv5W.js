import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const config = require('./project.config.json');

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        config.docsUrlStart
      ]
    }
  },
  resolve: {
    alias: {
      $conf: path.resolve(__dirname, './project.config.json')
    }
  }
});
