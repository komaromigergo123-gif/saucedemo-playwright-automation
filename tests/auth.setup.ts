import { test as setup, expect } from '../fixtures/pages';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('/inventory.html');

  await page.context().storageState({
    path: authFile,
  });
});