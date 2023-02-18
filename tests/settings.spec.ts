import { expect, test } from '@playwright/test';

test('Settings can be accessed anonymously', async ({ page }) => {
  await page.goto('/feed');
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL('/settings');
});
