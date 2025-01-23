import { expect, test } from '@playwright/test';

test.describe('Exercises Page', () => {
  test.beforeEach(async ({ page }) => {
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
	});

  test('should display the exercises page', async ({ page }) => {
    await expect(page).toHaveTitle(/All exercises | Skill-Forge/);
    await expect(page.locator('input')).toBeVisible();
  });

  test('should display a list of exercises', async ({ page }) => {
    const exercises = page.locator('tbody tr');
    await expect(exercises).toHaveCount().toBeGreaterThan(0);
  });

  test('should filter exercises based on search input', async ({ page }) => {
    const searchInput = page.locator('#search');
    await searchInput.fill('JavaScript');
    await searchInput.press('Enter');

    const filteredExercises = page.locator('tbody tr');
    await expect(filteredExercises).toHaveCount().toBeGreaterThan(0);
    await expect(filteredExercises.first()).toContainText('JavaScript');
  });

  test('should sort exercises by title', async ({ page }) => {
    const titleHeader = page.locator('th:has-text("Title") button');
    await titleHeader.click();

    const firstExerciseTitle = await page.locator('tbody tr:first-child td:nth-child(3)').innerText();
    const secondExerciseTitle = await page.locator('tbody tr:nth-child(2) td:nth-child(3)').innerText();

    expect(firstExerciseTitle.localeCompare(secondExerciseTitle)).toBeLessThanOrEqual(0);
  });

  test('should sort exercises by difficulty', async ({ page }) => {
    const difficultyHeader = page.locator('th:has-text("Difficulty") button');
    await difficultyHeader.click();

    const firstExerciseDifficulty = await page.locator('tbody tr:first-child td:nth-child(4)').innerText();
    const secondExerciseDifficulty = await page.locator('tbody tr:nth-child(2) td:nth-child(4)').innerText();

    const difficultyMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
    expect(difficultyMap[firstExerciseDifficulty] <= difficultyMap[secondExerciseDifficulty]).toBeTruthy();
  });

  test('should sort exercises by date added', async ({ page }) => {
    const dateHeader = page.locator('th:has-text("Added") button');
    await dateHeader.click();

    const firstExerciseDate = new Date(await page.locator('tbody tr:first-child td:nth-child(5)').innerText());
    const secondExerciseDate = new Date(await page.locator('tbody tr:nth-child(2) td:nth-child(5)').innerText());

    expect(firstExerciseDate <= secondExerciseDate).toBeTruthy();
  });
});
