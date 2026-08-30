import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('open products page without login', async ({ page }) => {
  await page.goto('/inventory.html');
  expect(await page.getByRole('heading', {name: "Epic sadface: You can only access '/inventory.html' when you are logged in."}).isVisible()).toBe(true);
});

test('empty field error', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Login' }).click();
  expect(await page.getByRole('heading', {name: 'Epic sadface: Username is required'}).isVisible()).toBe(true);

});
test('wrong details error', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('asd');
  await page.getByRole('textbox', { name: 'Password' }).fill('asd');
  await page.getByRole('button', { name: 'Login' }).click();
  expect(await page.getByRole('heading', { name: 'Epic sadface: Username and password do not match any user in this service' }).isVisible()).toBe(true);

});
test('login succesful', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html');
  

});
test('locked out user', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  expect(await page.getByRole('heading', { name: 'Epic sadface: Sorry, this user has been locked out.' }).isVisible()).toBe(true);

});
