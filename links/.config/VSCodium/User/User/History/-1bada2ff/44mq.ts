import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				border: 'hsl(var(--border) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
				},
			},
			fontFamily: {
				sans: ['Poppins, sans-serif', ...fontFamily.sans],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			}
		}
	},

	plugins: []
} satisfies Config;
