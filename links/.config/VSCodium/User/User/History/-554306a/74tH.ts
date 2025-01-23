import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				card: 'hsl(var(--card) / <alpha-value>)',
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					light: 'hsl(var(--secondary-light) / <alpha-value>)'
				},
				danger: 'hsl(var(--danger) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)'
				}
			},
			fontFamily: {
				sans: ['Poppins', ...fontFamily.sans],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			},
			borderRadius: {
				DEFAULT: '0.375rem',
				lg: '0.75rem'
			}
		}
	},
	plugins: []
} satisfies Config;
