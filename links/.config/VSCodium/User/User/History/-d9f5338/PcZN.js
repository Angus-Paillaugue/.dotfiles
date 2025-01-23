import { expect, test } from '@playwright/test';

test('home page has has sign-up and log-in form', async ({ page }) => {
	await page.goto('/');
	const forms = await page.getByRole('form');
	console.log(forms);
	expect(forms).not.toBeNull();
	expect(forms).toHaveLength(2);

	const [signUpForm, logInForm] = forms;

	expect(await signUpForm.isVisible()).toBeTruthy();
	expect(await logInForm.isVisible()).toBeTruthy();
});
