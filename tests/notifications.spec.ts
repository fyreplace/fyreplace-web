import { expect, test } from '@playwright/test';

test('Notifications cannot be accessed anonymously', async ({ page }) => {
  await page.goto('/feed');
  const link = page.getByRole('link', { name: 'Notifications' })
  await expect(link).toBeDisabled();
});
