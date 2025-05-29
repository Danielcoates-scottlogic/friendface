import { test as base, expect } from '@playwright/test';

base.describe('Public tests', () => {
  const test = base.extend({ storageState: undefined });

  test('home page, not logged in, show error', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/home');

    await expect(
      page.getByText('You must be signed in to view this content')
    ).toBeVisible();
    const button = page.getByText('Sign in here');

    await button.click();
    await expect(page).toHaveURL('http://localhost:4200/pages/create-account');
  });

  test('has title', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/home');
    await expect(page).toHaveTitle('Friendface');
  });
  test('dark mode toggle', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    const icon = page.locator('button mat-icon');
    await icon.click();
    await expect(page.locator('body')).toHaveClass('dark-theme');
  });
});

base.describe('Authenticated tests', () => {
  const test = base.extend({ storageState: 'storage/dan.json' });

  test('Access protected home page', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/home');
    await expect(page.getByText('Content:')).toBeVisible();
  });

  test('User can add post', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/home');
    const uniqueContent = `New post from playwright ${Date.now()}`;
    await page.getByLabel('Content:').fill(uniqueContent);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(uniqueContent)).toBeVisible();
  });
  test('User can logout', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/home');
    await page.getByText('Logout').click();
    await expect(page).toHaveURL('http://localhost:4200/pages/create-account');
  });
  test('User can like posts', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/home');

    const post = await page
      .locator('.post')
      .filter({ hasText: 'joe' })
      .filter({ hasText: 'im locked in' });

    const likeCountLocator = post.locator('.likes');
    const likeButton = post.locator('button');

    const initialText = await likeCountLocator.innerText();
    const initialCount = parseInt(initialText.replace(/\D+/g, ''));
    console.log(initialCount);

    await likeButton.click();

    await expect(likeCountLocator).toHaveText(`Likes ${initialCount + 1}`);
  }); // breaks due to same user being used for all 3 browsers
  test('User can unlike posts', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/home');

    const post = await page
      .locator('.post')
      .filter({ hasText: 'joe' })
      .filter({ hasText: 'im locked in' });

    const likeCountLocator = post.locator('.likes');
    const likeButton = post.locator('button');

    const initialText = await likeCountLocator.innerText();
    const initialCount = parseInt(initialText.replace(/\D+/g, ''));
    console.log(initialCount);

    await likeButton.click();

    await expect(likeCountLocator).toHaveText(`Likes ${initialCount - 1}`);
  }); // breaks due to same user being used for all 3 browsers
  test('dark mode toggle', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    const icon = page.locator('button mat-icon');
    await icon.click();
    await expect(page.locator('body')).toHaveClass('dark-theme');
  });
});
