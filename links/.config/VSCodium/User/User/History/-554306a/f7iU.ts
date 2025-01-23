import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: 'rgba(var(--border), <alpha-value>)',
				background: 'rgba(var(--background), <alpha-value>)',
				foreground: 'rgba(var(--foreground), <alpha-value>)',
				card: 'rgba(var(--card), <alpha-value>)',
				danger: 'rgba(var(--danger), <alpha-value>)',
			},
			fontFamily: {
				sans: ['Poppins', ...fontFamily.sans],
				mono: ['JetBrains Mono', ...fontFamily.mono]
			},
			borderRadius: {
				DEFAULT: '0.375rem',
				lg: '0.75rem',
			}
		}
	},
	plugins: []
} satisfies Config;
