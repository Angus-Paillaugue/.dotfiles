import { test as setup } from '@playwright/test';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const authFile = path.join(__dirname, '../tests/e2e/.auth/user.json');
log

setup('authenticate', async ({ page }) => {
	// Go to the login page
	await page.goto('/');

	// Fill in the login form
	await page.click('#formSelectors button:nth-child(2)');
	await page.fill('form:nth-child(2) input[type="text"]', 'Angus');
	await page.fill('form:nth-child(2) input[type="password"]', 'APAILL40');
	await page.click('form:nth-child(2) button[type="submit"]');

	// Wait for navigation to the exercises page
	await page.waitForNavigation();

	// Go to the exercises page
	await page.goto('/app/exercises');

	await page.context().storageState({ path: authFile });
});
