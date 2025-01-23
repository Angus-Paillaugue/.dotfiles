/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Example script for running Lighthouse on an authenticated page.
 * See docs/recipes/auth/README.md for more.
 */

import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import esMain from 'es-main';

/**
 * @param {puppeteer.Page} page
 * @param {string} origin
 */
async function login(page, origin) {
	await page.goto(origin);
	await page.waitForSelector('form#logIn input[type="text"]', { visible: true });

	// Fill in and submit login form.
	const emailInput = await page.$('form#logIn input[type="text"]');
	await emailInput.type('Angus');
	const passwordInput = await page.$('form#logIn input[type="password"]');
	await passwordInput.type('APAILL40');
  const submitButton = await page.$('form#logIn input[type="submit"]');
  await submitButton.click();
}

/**
 * @param {puppeteer.Page} page
 * @param {string} origin
 */
async function logout(page, origin) {
	await page.goto(`${origin}/app/account/log-out`);
}

async function main() {
	// Direct Puppeteer to open Chrome with a specific debugging port.
	const browser = await puppeteer.launch({
		// Set DEBUG environment variable if you want to see the tests in action.
		slowMo: 50,
    headless: false,
    devTools: true,
	});
	const page = await browser.newPage();

	// Setup the browser session to be logged into our site.
	await login(page, 'http://localhost:5173');

	// The local server is running on port 10632.
	const url = 'http://localhost:5173/app/account';

	// Direct Lighthouse to use the same Puppeteer page.
	// Disable storage reset so login session is preserved.
	await lighthouse(url, { disableStorageReset: true }, undefined, page);

	// Direct Puppeteer to close the browser as we're done with it.
	await browser.close();
}

if (esMain(import.meta)) {
	await main();
}

export { login, logout };
