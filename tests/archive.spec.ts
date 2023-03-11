import { expect, test } from '@playwright/test';

test('Archive cannot be accessed anonymously', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Archive' });
  await expect(link).toBeDisabled();
});
