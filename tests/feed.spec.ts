import { expect, test } from '@playwright/test';

test('Feed can be accessed anonymously', async ({ page }) => {
  await page.goto('/settings');
  await page.getByRole('link', { name: 'Feed' }).click();
  await expect(page).toHaveURL('/feed');
});
