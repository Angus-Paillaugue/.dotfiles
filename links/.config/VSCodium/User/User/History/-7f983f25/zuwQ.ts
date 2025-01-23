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
					0: '#282828',
					1: '#3c3836',
					2: '#504945',
					3: '#665c54',
					4: '#7c6f64',
					5: '#928374',
					6: '#a89984',
					7: '#bdae93',
					8: '#d5c4a1',
					9: '#ebdbb2',
					10: '#fbf1c7',
					11: '#f2e5bc'
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
