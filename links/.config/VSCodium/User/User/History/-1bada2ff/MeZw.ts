import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				muted: 'var(--muted)',
				background: 'var(--background)'
			}
		}
	},

	plugins: []
} satisfies Config;
