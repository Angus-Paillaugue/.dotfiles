/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins']
			},
			transitionTimingFunction: {
				'back-out': 'cubic-bezier(0.34, 2, 0.64, 1)'
			}
		}
	},
	plugins: []
};
