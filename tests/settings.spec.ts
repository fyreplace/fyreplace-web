import { expect, test } from '@playwright/test';

test('Settings can be accessed anonymously', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL('/settings');
});

test('Anonymous settings only have the account section', async ({ page }) => {
  await page.goto('/settings');

  for (const name of ['Profile', 'About', 'Danger zone']) {
    const profileHeading = page.getByRole('heading', { name });
    await expect(profileHeading).toBeHidden();
  }

  const accountHeading = page.getByRole('heading', { name: 'Account' });
  await expect(accountHeading).toBeVisible();
});
