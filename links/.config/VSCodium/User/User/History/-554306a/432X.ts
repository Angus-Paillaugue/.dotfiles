import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: 'rgb(var(--border) / <alpha-value>)',
				background: 'rgb(var(--background) / <alpha-value>)',
				foreground: 'rgb(var(--foreground) / <alpha-value>)',
				'bg-card': 'rgb(var(--bg-card) / <alpha-value>)'
			},
			fontFamily: {
				sans: ['Poppins', ...fontFamily.sans],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			}
		}
	},
	plugins: []
} satisfies Config;
