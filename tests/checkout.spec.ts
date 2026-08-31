/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { readFile } from 'fs/promises';
import { CheckoutPage } from '../pages/CheckoutPage';


test('checkout First Name mandatory', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('', '123', '123')
  expect(checkoutPage.errorMessage).toHaveText("Error: First Name is required")
  

});

test('checkout Last Name mandatory', async ({ page }) => {
   const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '', '123')
  expect(checkoutPage.errorMessage).toHaveText("Error: Last Name is required")
  

});
test('checkout Zip/Postal Code mandatory', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '')
  expect(checkoutPage.errorMessage).toHaveText("Error: Postal Code is required")
  

});
test('checkout overview', async ({ page }) => {
     const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '123')
  await expect(checkoutPage.itemName).toBeVisible();
  await expect(checkoutPage.itemQuantity).toHaveText('1');
});
test('checkout finish', async ({ page }) => {
     const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '123')
  await checkoutPage.finishButton.click();
  await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");
 
});
test('checkout generate pdf', async ({ page }, testInfo) => {
  
     const checkoutPage = new CheckoutPage(page);
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '123')
  await checkoutPage.finishButton.click();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Generate pdf order' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  const downloadedFile = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(downloadedFile);
  expect((await readFile(downloadedFile)).subarray(0, 4).toString()).toBe('%PDF');
 
});

