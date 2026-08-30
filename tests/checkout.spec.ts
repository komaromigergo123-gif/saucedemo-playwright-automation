import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';


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
test('checkout finish', async ({ page }) => {
  
  await page.goto('/cart.html');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', {name: 'First Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Last Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('123')
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText("THANK YOU FOR YOUR ORDER")).toBeVisible();
  await expect(page.getByText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")).toBeVisible();
});
test('checkout generate pdf', async ({ page }, testInfo) => {
  
  await page.goto('/cart.html');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', {name: 'First Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Last Name'}).fill('123')
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('123')
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Generate pdf order' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  const downloadedFile = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(downloadedFile);
  expect((await readFile(downloadedFile)).subarray(0, 4).toString()).toBe('%PDF');
 
});

