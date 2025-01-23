import { expect, test } from '@playwright/test';

test('home page has has sign-up and log-in form', async ({ page }) => {
	await page.goto('/');
	const forms = await page.$$('form'); // Use $$ to select multiple elements
	expect(forms).not.toBeNull();
	expect(forms.length).toBe(2); // Check the length property directly

	const [signUpForm, logInForm] = forms;

	expect(await signUpForm.isVisible()).toBeTruthy();
	expect(await logInForm.isVisible()).toBeTruthy();

	const signUpFormFields = await signUpForm.$$('input');
	expect(signUpFormFields).not.toBeNull();
	expect(signUpFormFields.length).toBe(2);
	expect(signUpFormFields[0]).
	expect(signUpFormFields[1]).not.toBeNull();

	const logInFormFields = await logInForm.$$('input');
	expect(logInFormFields).not.toBeNull();
	expect(logInFormFields.length).toBe(2);
});
