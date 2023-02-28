import { expect, test } from '@playwright/test';

test('Toolbar shows current page', async ({ page }) => {
  await page.goto('/feed');
  const feedTitle = page.getByRole('heading', { name: 'Feed' });
  await expect(feedTitle).toHaveText('Feed');
  await page.goto('/settings');
  const settingsTitle = page.getByRole('heading', { name: 'Settings' });
  await expect(settingsTitle).toHaveText('Settings');
});
