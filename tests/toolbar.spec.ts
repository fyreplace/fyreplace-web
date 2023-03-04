import { expect, test } from '@playwright/test';

test('Toolbar shows current page', async ({ page }) => {
  await page.goto('/feed');
  const feedTitle = page.getByRole('heading', { name: 'Feed' });
  await expect(feedTitle).toHaveText('Feed');
  await page.goto('/settings');
  const settingsTitle = page.getByRole('heading', { name: 'Settings' });
  await expect(settingsTitle).toHaveText('Settings');
});

test('Toolbar does not show back button on top-level pages', async ({ page }) => {
  for (const url of ['/feed', '/notifications', '/archive', '/drafts', '/settings']) {
    await page.goto(url);
    const backButton = page.getByRole('button', { name: 'Back' });
    await expect(backButton).toBeHidden();
  }
});

test('Toolbar show back button on deep pages', async ({ page }) => {
  for (const url of ['/settings/registration', '/settings/login', '/settings/blocked-users']) {
    await page.goto(url);
    const backButton = page.getByRole('button', { name: 'Back' });
    await expect(backButton).toBeVisible();
  }
});

test('Back button goes back', async ({ page }) => {
  await page.goto('/settings');
  await page.goto('/settings/registration');
  const backButton = page.getByRole('button', { name: 'Back' });
  await backButton.click();
  await expect(page).toHaveURL('/settings');
});
