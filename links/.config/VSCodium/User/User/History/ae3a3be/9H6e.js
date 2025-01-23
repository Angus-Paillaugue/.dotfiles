import baseConfig from '@repo/tailwind-config/tailwind.config.js';
console.log(baseConfig);

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: ['./**/*.{html,js,svelte,md,svx,mdx}', '!./node_modules/**']
};
