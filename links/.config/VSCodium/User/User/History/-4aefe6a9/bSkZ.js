import plugin from 'tailwindcss/plugin';

const hocusPlugin = plugin(({ addVariant }) => {
	// Add hocus utility variant
	addVariant('hocus', ['&:hover', '&:focus']);
});

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderColor: {
				main: {
					DEFAULT: 'theme(colors.neutral.300/50)',
					dark: 'theme(colors.neutral.800)'
				}
			},
			fontFamily: {
				sans: ['Mulish'],
				mono: ['JetBrains Mono']
			}
		}
	},
	plugins: [hocusPlugin],
	darkMode: 'class'
};
