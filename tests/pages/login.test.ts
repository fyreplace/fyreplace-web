import { expect, test } from '@playwright/test';

test('Identifier must have correct length', async ({ page }) => {
	await page.goto('/login');
	const identifier = page.getByRole('textbox', { name: 'Identifier' });
	const submit = page.getByRole('button', { name: 'Login' });
	await expect(identifier).toBeVisible();
	await expect(submit).toBeVisible();
	await expect(submit).toBeDisabled();

	for (let i = 0; i < 3; i++) {
		await identifier.fill('a'.repeat(i));
		await expect(submit).toBeDisabled();
	}

	for (let i = 3; i <= 254; i++) {
		await identifier.fill('a'.repeat(i));
		await expect(submit).toBeEnabled();
	}

	await identifier.fill('a'.repeat(255));
	await expect(submit).toBeDisabled();
});
