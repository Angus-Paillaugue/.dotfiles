import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm preview',
		port: 4173,
		timeout: 5 * 60 * 60 * 1000
	},
	testDir: 'tests/e2e'
});
