#!/bin/bash

cd ~/Documents/perso

if [ -d "$1" ]; then
  echo "Directory $1 already exists"
  exit 1
fi
if [ -z "$1" ]; then
  echo "Please provide a project name"
  exit 1
fi

# Create a new Svelte project
npm create svelte@latest $1
cd $1

# Install the dependencies
pnpm install
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess()
};
export default config;" > svelte.config.js

echo "/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: []
};" > tailwind.config.js

echo "@tailwind base;
@tailwind components;
@tailwind utilities;" > src/app.css

echo "<script>
  import "../app.css";
</script>

<slot />" > src/routes/+layout.svelte
