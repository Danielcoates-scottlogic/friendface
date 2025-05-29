import { test, expect } from '@playwright/test';
import { fillTextValue } from './utils/fill_text';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(page).toHaveTitle('Friendface');
});

test('login with valid user test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await fillTextValue(page, 'Username', 'dan');
  await fillTextValue(page, 'Password', 'dan');
  const button = page.locator('input[type="submit"]');
  await button.click();

  await expect(page).toHaveURL('http://localhost:4200/pages/home');
  await expect(page.getByText('Username: dan')).toBeVisible({ timeout: 20000 });
});

test('login with invalid user test', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await fillTextValue(page, 'Username', 'Not real');
  await fillTextValue(page, 'Password', 'Not real');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Invalid credentials.');
    await dialog.dismiss();
  });

  const button = page.locator('input[type="submit"]');
  await button.click();
});

test('login with username less than 3 characters', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await fillTextValue(page, 'Username', 'No');
  await fillTextValue(page, 'Password', 'Not real');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Username must be at least 3 characters');
    await dialog.dismiss();
  });

  const button = page.locator('input[type="submit"]');
  await button.click();
});

test('login with password less than 3 characters', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await fillTextValue(page, 'Username', 'Not real');
  await fillTextValue(page, 'Password', 'No');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('password must be at least 3 characters');
    await dialog.dismiss();
  });

  const button = page.locator('input[type="submit"]');
  await button.click();
});

test('create account, username taken', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page
    .getByRole('button', { name: /not got an account\? create one/i })
    .click();
  await fillTextValue(page, 'Enter a username', 'dan');
  await fillTextValue(page, 'Enter a password', 'dan');
  await fillTextValue(page, 'Re-enter your password', 'dan');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('User already exists!');
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]').click();
});

test('create account, passwords dont match', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page
    .getByRole('button', { name: /not got an account\? create one/i })
    .click();
  await fillTextValue(page, 'Enter a username', 'dan');
  await fillTextValue(page, 'Enter a password', 'dan');
  await fillTextValue(page, 'Re-enter your password', 'da');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe("Passwords don't match");
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]').click();
});

test('create account, username less than 3 chars', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page
    .getByRole('button', { name: /not got an account\? create one/i })
    .click();
  await fillTextValue(page, 'Enter a username', 'da');
  await fillTextValue(page, 'Enter a password', 'dan');
  await fillTextValue(page, 'Re-enter your password', 'dan');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Username must be at least 3 characters');
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]').click();
});

test('create account, password less than 3 chars', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page
    .getByRole('button', { name: /not got an account\? create one/i })
    .click();
  await fillTextValue(page, 'Enter a username', 'dan');
  await fillTextValue(page, 'Enter a password', 'da');
  await fillTextValue(page, 'Re-enter your password', 'da');

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('password must be at least 3 characters');
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]').click();
});

test('dark mode toggle', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  const icon = page.locator('button mat-icon');
  await icon.click();
  await expect(page.locator('body')).toHaveClass('dark-theme');
});
