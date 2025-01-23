import { expect, test } from '@playwright/test';

test.describe('Learning Paths Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/app/learning-paths');
	});

	test('should display the learning paths page', async ({ page }) => {
		await expect(page).toHaveTitle(/Learning paths | Skill-Forge/);
		await expect(page.locator('h1')).toHaveText(/Learning paths/);
	});

	test('should display started learning paths', async ({ page }) => {
		const startedPathsHeader = page.locator('h1:has-text("Continue Learning")');
		await expect(startedPathsHeader).toBeVisible();

		const startedPaths = page.locator('div:has-text("Continue Learning") + div a');
		await expect(startedPaths).toHaveCountGreaterThan(0);
	});

	test('should display not started learning paths', async ({ page }) => {
		const notStartedPathsHeader = page.locator('h1:has-text("Start Today")');
		await expect(notStartedPathsHeader).toBeVisible();

		const notStartedPaths = page.locator('div:has-text("Start Today") + div a');
		await expect(notStartedPaths).toHaveCountGreaterThan(0);
	});

	test('should navigate to a learning path detail page when a path is clicked', async ({
		page
	}) => {
		const firstPath = page.locator('div:has-text("Continue Learning") + div a').first();
		await firstPath.click();

		await expect(page).toHaveURL(/\/app\/learning-paths\/\d+/);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('should display progress bar for started paths', async ({ page }) => {
		const progressBar = page.locator('div:has-text("Continue Learning") + div a div.relative h-2');
		await expect(progressBar).toBeVisible();
	});

	test('should display correct progress text for started paths', async ({ page }) => {
		const progressText = page.locator(
			'div:has-text("Continue Learning") + div a div.flex-row span.text-lg'
		);
		await expect(progressText).toHaveText(/\/\d+/);
	});
});
