import { expect, test } from '@playwright/test';

test('home page has has sign-up and log-in form', async ({ page }) => {
	await page.goto('/');
	const forms = await page.$$('form'); // Use $$ to select multiple elements
	expect(forms).not.toBeNull();
	expect(forms.length).toBe(2); // Check the length property directly

	const [signUpForm, logInForm] = forms;

	expect(await signUpForm.isVisible()).toBeTruthy();
	expect(await logInForm.isVisible()).toBeTruthy();
	signUpForm.
	console.log(signUpForm);
});
