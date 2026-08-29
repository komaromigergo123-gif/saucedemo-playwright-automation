import { test, expect } from '@playwright/test';



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
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html');
  

});
test('locked out user', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  expect(await page.getByRole('heading', { name: 'Epic sadface: Sorry, this user has been locked out.' }).isVisible()).toBe(true);

});
