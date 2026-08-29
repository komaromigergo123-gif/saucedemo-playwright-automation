import { test, expect } from '@playwright/test';


test('checkout First Name mandatory', async ({ page }) => {

  await page.goto('/cart.html');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', {name: 'Last Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('123')
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText("Error: First Name is required")).toBeVisible();

});

test('checkout Last Name mandatory', async ({ page }) => {
  
  await page.goto('/cart.html');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', {name: 'First Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('123')
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText("Error: Last Name is required")).toBeVisible();

});
test('checkout Zip/Postal Code mandatory', async ({ page }) => {
  
  await page.goto('/cart.html');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', {name: 'First Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Last Name'}).fill('123')
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText("Error: Postal Code is required")).toBeVisible();

});
test('checkout overview', async ({ page }) => {
  
  await page.goto('/cart.html');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', {name: 'First Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Last Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('123')
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
});
