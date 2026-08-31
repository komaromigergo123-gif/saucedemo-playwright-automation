import { test, expect } from '../fixtures/pages';

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
test('login succesful', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('/inventory.html');

});
test('locked out user', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.errorHeading).toHaveText('Epic sadface: Sorry, this user has been locked out.');

});
