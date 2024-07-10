import { expect, test } from '@playwright/test';

test('Username must have correct length', async ({ page }) => {
	await page.goto('/register');
	const username = page.getByRole('textbox', { name: 'Username' });
	const email = page.getByRole('textbox', { name: 'Email' });
	const submit = page.getByRole('button', { name: 'Sign up' });
	await expect(username).toBeVisible();
	await expect(email).toBeVisible();
	await expect(submit).toBeVisible();
	await expect(submit).toBeDisabled();
	await email.fill('email@example.org');

	for (let i = 0; i < 3; i++) {
		await username.fill('a'.repeat(i));
		await expect(submit).toBeDisabled();
	}

	for (let i = 3; i <= 50; i++) {
		await username.fill('a'.repeat(i));
		await expect(submit).toBeEnabled();
	}

	await username.fill('a'.repeat(51));
	await expect(submit).toBeDisabled();
});

test('Email must have correct length', async ({ page }) => {
	await page.goto('/register');
	const username = page.getByRole('textbox', { name: 'Username' });
	const email = page.getByRole('textbox', { name: 'Email' });
	const submit = page.getByRole('button', { name: 'Sign up' });
	await expect(username).toBeVisible();
	await expect(email).toBeVisible();
	await expect(submit).toBeVisible();
	await expect(submit).toBeDisabled();
	await username.fill('some_user');

	for (let i = 0; i < 3; i++) {
		await email.fill('@'.repeat(i));
		await expect(submit).toBeDisabled();
	}

	for (let i = 3; i <= 254; i++) {
		await email.fill('@'.repeat(i));
		await expect(submit).toBeEnabled();
	}

	await email.fill('@'.repeat(255));
	await expect(submit).toBeDisabled();
});

test('Email must contain "@"', async ({ page }) => {
	await page.goto('/register');
	const username = page.getByRole('textbox', { name: 'Username' });
	const email = page.getByRole('textbox', { name: 'Email' });
	const submit = page.getByRole('button', { name: 'Sign up' });
	await expect(username).toBeVisible();
	await expect(email).toBeVisible();
	await expect(submit).toBeVisible();
	await expect(submit).toBeDisabled();
	await username.fill('some_user');
	await email.fill('email');
	await expect(submit).toBeDisabled();
	await email.fill('email@');
	await expect(submit).toBeEnabled();
});
