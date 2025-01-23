import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm preview',
		port: 4173,
		timeout: 5 * 60 * 60 * 1000
	},
	testDir: 'tests/e2e',
	projects: [
		// Setup project
		{ name: 'setup', testMatch: /.*\.setup\.js/ },

		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Use prepared auth state.
				storageState: '/home/angus/Documents/perso/Skill-Forge/tests/e2e/.auth/user.json'
			},
			dependencies: ['setup']
		}
	]
});
