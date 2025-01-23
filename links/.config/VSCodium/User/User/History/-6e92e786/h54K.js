import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/app/account');
});

test('should display the account page title', async ({ page }) => {
  await expect(page).toHaveTitle(/Account | Skill-Forge/);
});

test("should display the user's username", async ({ page }) => {
  const username = page.locator('h3:first-child');
  await expect(username).toBeVisible();
  await expect(username).toHaveText("Angus"); // Ensure it has some text
});

test("should display the user's rank", async ({ page }) => {
  const rank = page.locator('p:has-text("Rank") span');
  await expect(rank).toBeVisible();
  await expect(rank).toHaveText(/^\d+$/); // Ensure it is a number
});

test('should display the solved problems count', async ({ page }) => {
  const solvedProblems = page.locator('h3:has-text("/")');
  await expect(solvedProblems).toBeVisible();
  await expect(solvedProblems).toHaveText(/^\d+\/\d+$/); // Ensure it is in the format "x/y"
});

test('should display the log out button', async ({ page }) => {
  const logOutButton = page.locator('a:has-text("Log out")');
  await expect(logOutButton).toBeVisible();
});

test('should display the settings button', async ({ page }) => {
  const settingsButton = page.locator('a:has-text("Settings")');
  await expect(settingsButton).toBeVisible();
});

test('should display the admin dashboard button if user is admin', async ({ page }) => {
  const adminButton = page.locator('a:has-text("Admin dashboard")');
  if ((await adminButton.count()) > 0) {
    await expect(adminButton).toBeVisible();
  }
});

test('should display the contributions grid', async ({ page }) => {
  const contributionsGrid = page.locator('h3:has-text("Contributions")');
  await expect(contributionsGrid).toBeVisible();
});

test('should display the recent activity section', async ({ page }) => {
  const recentActivitySection = page.locator('h3:has-text("Activity")');
  await expect(recentActivitySection).toBeVisible();
});

test('should display recent activities if any', async ({ page }) => {
  const recentActivities = page.locator('table tbody tr');
  if ((await recentActivities.count()) > 0) {
    await expect(recentActivities).toBeVisible();
  } else {
    const noActivityMessage = page.locator('div:has-text("You have no recent activity!")');
    await expect(noActivityMessage).toBeVisible();
  }
});
