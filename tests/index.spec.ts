import { expect, test } from '@playwright/test';

test('Index page is redirected to /feed', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/feed');
});
