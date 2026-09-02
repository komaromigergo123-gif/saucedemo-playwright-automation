import { test, expect } from '../fixtures/pages';
import { users } from '../data/users';

test('open products page without login', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page.getByRole('heading', { name: "Epic sadface: You can only access '/inventory.html' when you are logged in." })).toBeVisible();
});

test('empty field error', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginButton.click();
  await expect(loginPage.errorHeading).toHaveText('Epic sadface: Username is required');

});
test('wrong details error', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('asd', 'asd');
  await expect(loginPage.errorHeading).toHaveText('Epic sadface: Username and password do not match any user in this service');

});
test.describe('@smoke', () => {
  test('login succesful', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL('/inventory.html');

  });
});
test('locked out user', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await expect(loginPage.errorHeading).toHaveText('Epic sadface: Sorry, this user has been locked out.');

});
