import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, './tests/e2e/.auth/user.json');

setup('authenticate', async ({ page }) => {
	await page.goto('/');
	await page.click('#formSelectors button:nth-child(2)');
	await page.fill('form:nth-child(2) input[type="text"]', 'Angus');
	await page.fill('form:nth-child(2) input[type="password"]', 'APAILL40');
	await page.click('form:nth-child(2) button[type="submit"]');
	// Wait for navigation to the exercises page
	await page.waitForNavigation();

	await page.context().storageState({ path: authFile });
});
