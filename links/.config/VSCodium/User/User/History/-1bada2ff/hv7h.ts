import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: 'hsl(var(--primary) / <alpha-value>)',
				muted: 'hsl(var(--muted) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				secondary: 'hsl(var(--secondary) / <alpha-value>)',
				text: 'hsl(var(--text) / <alpha-value>)'
			}
		}
	},

	plugins: []
} satisfies Config;
