import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: 'var(--border) / <alpha-value>',
				background: 'var(--background) / <alpha-value>',
				foreground: 'var(--foreground) / <alpha-value>',
				'bg-card': 'var(--bg-card) / <alpha-value>'
			},
			fontFamily: {
				sans: ['Poppins', ...fontFamily.sans],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			}
		}
	},
	plugins: []
} satisfies Config;
