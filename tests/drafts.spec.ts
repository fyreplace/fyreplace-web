import { expect, test } from '@playwright/test';

test('Drafts cannot be accessed anonymously', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Drafts' });
  await expect(link).toBeDisabled();
});
