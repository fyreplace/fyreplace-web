import { expect, test } from '@playwright/test';

test('Initial page is feed', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByTestId('destinations.feed')).toBeVisible();
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

test('Navigation shows correct page', async ({ page }) => {
	await page.goto('/');

	for (const destination of ['Feed', 'Notifications', 'Archive', 'Drafts', 'Published']) {
		const name = destination.toLowerCase();
		await page.getByRole('link', { name: destination }).click();
		await expect(page.getByTestId('destinations.' + name)).toBeVisible();
	}

	await page.getByRole('link', { name: 'Settings' }).click();
	await expect(page.getByTestId('destinations.login')).toBeVisible();
});
