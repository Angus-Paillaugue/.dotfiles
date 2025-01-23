import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Poppins'],
				mono: ['JetBrains Mono']
			},
			colors: {
				gruvbox: {
					bg: '#282828',
					red: '#1D2021',
					green: '#1D2021',
					yellow: '#D79921',
					blue: '#D79921',
					purple: '#D79921',
					aqua: '#D79921',
					orange: '#D79921',
					foreground: '#D79921',
					9: '',
					10: '',
					11: ''
				}
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
		})
	]
} satisfies Config;
