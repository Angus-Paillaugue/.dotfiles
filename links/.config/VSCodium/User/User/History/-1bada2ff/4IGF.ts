import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: 'rgba(var(--primary), <alpha-value>)',
				muted: 'rgba(var(--muted)',
				background: 'rgba(var(--background)',
				secondary: 'rgba(var(--secondary)',
				text: 'rgba(var(--text)'
			}
		}
	},

	plugins: []
} satisfies Config;
