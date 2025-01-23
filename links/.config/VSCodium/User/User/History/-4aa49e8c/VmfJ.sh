#!/bin/bash

cd ~/Documents/perso

# Create a new Svelte project
npm create svelte@latest $1
cd $1

# Install the dependencies
pnpm install
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

cat <<EOT >> svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess()
};
export default config;
EOT

cat <<EOT >> tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: []
};
EOT

cat <<EOT >> src/app.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOT

cat <<EOT >> src/routes/+layout.svelte
<script>
  import "../app.css";
</script>

<slot />
EOT

