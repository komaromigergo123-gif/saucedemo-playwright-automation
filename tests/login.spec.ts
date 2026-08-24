import { test, expect } from '@playwright/test';


test('login', async ({ page }) => {
  await page.goto('https://sauce-demo.myshopify.com/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('komaromigergo123@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  expect(await page.getByRole('heading', { name: 'Account Details and Order History back!' }).isVisible()).toBe(true);

  
});