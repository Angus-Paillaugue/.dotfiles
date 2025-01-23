import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm dev',
		port: 5173,
		timeout: 5 * 60 * 60
	},
	testDir: 'tests/e2e'
});
