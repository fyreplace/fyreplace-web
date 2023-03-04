import { expect, test } from '@playwright/test';

test('Navigation is on the side on large screens', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.getByTestId('navigation-side')).toBeVisible();
  await expect(page.getByTestId('navigation-bottom')).toBeHidden();
});

test('Navigation is at the bottom on small screens', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 360, height: 720 });
  await expect(page.getByTestId('navigation-side')).toBeHidden();
  await expect(page.getByTestId('navigation-bottom')).toBeVisible();
});
