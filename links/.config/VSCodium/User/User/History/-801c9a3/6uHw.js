import plugin from 'tailwindcss/plugin';

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
				'body': 'theme("colors.neutral.900")',
			}
		}
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				'.ligatures-normal': {
					fontVariantLigatures: 'normal'
				},
				'.ligatures-none': {
					fontVariantLigatures: 'none'
				}
			});
		}),
		plugin(({ addUtilities }) => {
			addUtilities({
				'.text-wrap-none': {
					textWrap: 'none'
				},
				'.text-wrap-balance': {
					textWrap: 'balance'
				}
			});
		})
	]
};
