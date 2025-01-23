import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');

setup('authenticate', async ({ page }) => {
	// Perform authentication steps. Replace these actions with your own.
	await page.goto('/');
	await page.getByLabel('Username or email address').fill('username');
	await page.getByLabel('Password').fill('password');
	await page.getByRole('button', { name: 'Sign in' }).click();
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
