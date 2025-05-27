import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(page).toHaveTitle('Friendface');
});

test('login with valid user test', async ({ page }) => {
  await page.goto('http://localhost:4200/');


  await page.getByPlaceholder('Username').fill('dan');
  await page.getByPlaceholder('Password').fill('dan');
  const button = page.locator('input[type="submit"]');
  await button.click();

  await expect(page).toHaveURL('http://localhost:4200/pages/home');
  await expect(page.getByText('Username: dan')).toBeVisible({ timeout: 10000 });
});

test('login with invalid user test', async ({ page }) => {
  await page.goto('http://localhost:4200/');


  await page.getByPlaceholder('Username').fill('Not real');
  await page.getByPlaceholder('Password').fill('Not real');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Invalid credentials.');
    await dialog.dismiss();
  });

  const button = page.locator('input[type="submit"]');
  await button.click();
});

test('login with username less than 3 characters', async ({ page }) => {
  await page.goto('http://localhost:4200/');


  await page.getByPlaceholder('Username').fill('No');
  await page.getByPlaceholder('Password').fill('Not real');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Username must be at least 3 characters');
    await dialog.dismiss();
  });

  const button = page.locator('input[type="submit"]');
  await button.click();
});

test('login with password less than 3 characters', async ({ page }) => {
  await page.goto('http://localhost:4200/');


  await page.getByPlaceholder('Username').fill('Not real');
  await page.getByPlaceholder('Password').fill('No');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('password must be at least 3 characters');
    await dialog.dismiss();
  });

  const button = page.locator('input[type="submit"]');
  await button.click();
});

test('create account, username taken', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: /not got an account\? create one/i }).click();
  await page.getByPlaceholder('Enter a username').fill('dan');
  await page.getByPlaceholder('Enter a password').fill('dan');
  await page.getByPlaceholder('Re-enter your password').fill('dan');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('User already exists!');
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]');

})

test('create account, passwords dont match', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: /not got an account\? create one/i }).click();
  await page.getByPlaceholder('Enter a username').fill('dan');
  await page.getByPlaceholder('Enter a password').fill('dan');
  await page.getByPlaceholder('Re-enter your password').fill('da');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Passwords don\'t match');
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]');

})

test('create account, username less than 3 chars', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: /not got an account\? create one/i }).click();
  await page.getByPlaceholder('Enter a username').fill('da');
  await page.getByPlaceholder('Enter a password').fill('dan');
  await page.getByPlaceholder('Re-enter your password').fill('da');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Username must be at least 3 characters');
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]');

})

test('create account, password less than 3 chars', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: /not got an account\? create one/i }).click();
  await page.getByPlaceholder('Enter a username').fill('dan');
  await page.getByPlaceholder('Enter a password').fill('da');
  await page.getByPlaceholder('Re-enter your password').fill('da');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('password must be at least 3 characters');
    await dialog.dismiss();
  });

  await page.locator('input[type="submit"]');

})

test('dark mode toggle', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  const icon = page.locator('button mat-icon');
  await icon.click();
  await expect(page.locator('body')).toHaveClass('dark-theme');
})