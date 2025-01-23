import config from '@repo/tailwind-config';
console.log(config);


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js,svelte}', '!./node_modules/**'],
  ...config
};
