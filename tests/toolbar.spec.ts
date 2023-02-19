import { expect, test } from '@playwright/test';

test('Toolbar shows current page', async ({ page }) => {
  await page.goto('/feed');
  await expect(page.getByRole('heading')).toHaveText('Feed');
  await page.goto('/settings');
  await expect(page.getByRole('heading')).toHaveText('Settings');
});
