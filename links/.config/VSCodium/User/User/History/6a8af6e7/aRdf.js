import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,md}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins'],
				mono: ['JetBrains Mono']
			},
			colors: {
				'black-primary': '#131110',
				border: '#e7e7e9',
				'border-dark': '#2d2d2d',
				primary: {
					50: 'rgb(250 250 250)',
					100: 'rgb(245 245 245)',
					200: 'rgb(229 229 229)',
					300: 'rgb(212 212 212)',
					400: 'rgb(163 163 163)',
					500: 'rgb(115 115 115)',
					600: 'rgb(82 82 82)',
					700: 'rgb(64 64 64)',
					800: 'rgb(38 38 38)',
					900: 'rgb(23 23 23)',
					950: 'rgb(10 10 10)'
				}
			},
			textShadow: {
				code: '0 1px rgba(0, 0, 0, 0.3)',
				none: 'none'
			}
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, addUtilities, theme }) {
			// Add text-shadow utilities
			matchUtilities(
				{
					'text-shadow': (value) => ({
						textShadow: value
					})
				},
				{
					values: theme('textShadow')
				}
			),
				addUtilities({
					// Add font-ligatures utilities
					'.ligatures-normal': {
						fontVariantLigatures: 'normal'
					},
					'.ligatures-none': {
						fontVariantLigatures: 'none'
					},
					// Add text-wrap utilities
					'.text-wrap-none': {
						textWrap: 'none'
					},
					'.text-wrap-balance': {
						textWrap: 'balance'
					}
				});
		})
	],
	darkMode: 'class'
};
