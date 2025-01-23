/** @type {import('tailwindcss').Config} */
export default {
	content: ['./**/*.{html,js,svelte,md,svx,mdx}', '!./node_modules/**'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Poppins'],
				heading: ['JetBrains Mono']
			},
			colors: {
				body: 'theme("colors.neutral.900")',
				border: '#2f2f2f',
				card: '#1e1e1e'
			}
		}
	},
	plugins: []
};
