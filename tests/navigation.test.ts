import { expect, test } from '@playwright/test';

test('Initial page is feed', async ({ page }) => {
	await page.goto('/');
	expect(page.url()).toMatch(/\/feed$/);
});

test('Navigation is complete', async ({ page }) => {
	await page.goto('/');

	for (const destination of ['Feed', 'Notifications', 'Drafts', 'Settings']) {
		await expect(page.getByRole('link', { name: destination })).toBeVisible();
	}

	await page.getByRole('link', { name: 'Notifications' }).click();
	await page.waitForURL(/notifications/);
	await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();

	await page.getByRole('link', { name: 'Drafts' }).click();
	await page.waitForURL(/drafts/);
	await expect(page.getByRole('link', { name: 'Published' })).toBeVisible();
});

test('Navigation show correct page', async ({ page }) => {
	await page.goto('/');

	for (const destination of [
		'Feed',
		'Notifications',
		'Archive',
		'Drafts',
		'Published',
		'Settings'
	]) {
		const url = new RegExp(`/${destination.toLowerCase()}$`);
		await page.getByRole('link', { name: destination }).click();
		await page.waitForURL(url);
		expect(page.url()).toMatch(url);
	}
});
