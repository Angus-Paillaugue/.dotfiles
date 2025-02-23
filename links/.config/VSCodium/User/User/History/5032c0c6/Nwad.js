import { textWrapPlugin } from './plugins.tailwind.js';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./**/*.{html,js,svelte,md,svx,mdx}', '!./node_modules/**'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Poppins'],
				heading: ['Ubuntu']
			},
			colors: {
				'text-body': {
					DEFAULT: 'theme(colors.neutral.500)',
					dark: 'theme(colors.neutral.400)'
				},
				'text-heading': {
					DEFAULT: 'theme(colors.neutral.900)',
					dark: 'theme(colors.neutral.100)'
				},
				body: {
					DEFAULT: 'theme(colors.white)',
					dark: 'theme(colors.neutral.950)'
				}
			}
		}
	},
	plugins: [textWrapPlugin]
};
