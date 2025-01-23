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
			colors: {
				primary: {
					50: 'rgb(255, 249, 237)',
					100: 'rgb(254, 242, 214)',
					200: 'rgb(252, 224, 172)',
					300: 'rgb(249, 201, 120)',
					400: 'rgb(247, 177, 85)',
					500: 'rgb(243, 141, 28)',
					600: 'rgb(228, 115, 18)',
					700: 'rgb(189, 87, 17)',
					800: 'rgb(150, 69, 22)',
					900: 'rgb(121, 58, 21)',
					950: 'rgb(65, 28, 9)'
				}
			},
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
