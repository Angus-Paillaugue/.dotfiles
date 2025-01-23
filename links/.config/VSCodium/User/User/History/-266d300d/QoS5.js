import config from '@repo/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js,svelte,md,svx,mdx}', '!./node_modules/**'],
  ...config
};
