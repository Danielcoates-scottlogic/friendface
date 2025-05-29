import test, {
  expect,
  chromium,
  firefox,
  webkit,
  Browser,
  BrowserType,
} from '@playwright/test';
import { fillTextValue } from './utils/fill_text';
//auth expires after 30 mins
const saveAuthState = async (
  browserType: BrowserType,
  username: string,
  password: string,
  fileName: string
) => {
  const browser = await browserType.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:4200/');
  await fillTextValue(page, 'Username', username);
  await fillTextValue(page, 'Password', password);
  await page.locator('input[type="submit"]').click();
  await expect(page).toHaveURL('http://localhost:4200/pages/home');

  await context.storageState({ path: fileName });
  await browser.close();
};

test.use({browserName: 'chromium'});
test('Save auth for all browsers', async () => {
  await saveAuthState(chromium, 'dan', 'dan', 'storage/dan.json');
  await saveAuthState(firefox, 'joe', 'joe', 'storage/joe.json');
  await saveAuthState(webkit, 'junde', 'junde', 'storage/junde.json');
});
