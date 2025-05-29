import { Page } from 'playwright/test';

export async function fillTextValue(
  page: Page,
  placeHolder: string,
  data: string
) {
  await page.getByPlaceholder(placeHolder).fill(data);
}
