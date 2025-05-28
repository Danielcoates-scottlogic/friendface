import { test, expect } from '@playwright/test';
//auth expires after 30 mins
test('login and save storage', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByPlaceholder('Username').fill('dan');
  await page.getByPlaceholder('Password').fill('dan');
  const button = page.locator('input[type="submit"]');
  await button.click();

  await expect(page).toHaveURL('http://localhost:4200/pages/home');
  await page.context().storageState({ path: 'storage/auth.json' });
});
