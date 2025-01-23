import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: 'rgba(var(--primary), <alpha-value>)',
				muted: 'rgba(var(--muted), <alpha-value>)',
				background: 'rgba(var(--background), <alpha-value>)',
				secondary: 'rgba(var(--secondary), <alpha-value>)',
				text: 'rgba(var(--text), <alpha-value>)'
			}
		}
	},

	plugins: []
} satisfies Config;
