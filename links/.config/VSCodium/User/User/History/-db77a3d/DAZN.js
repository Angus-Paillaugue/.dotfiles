// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the correct title and CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Check the title
    const title = await page.locator('h1');
    await expect(title).toHaveText(/Your Project Name, Your Catchphrase/);

    // Check the CTA buttons
    const getStartedButton = await page.locator('text=Get started');
    await expect(getStartedButton).toBeVisible();

    const ghostButton = await page.locator('text=Ghost Button Text');
    await expect(ghostButton).toBeVisible();
  });
});
