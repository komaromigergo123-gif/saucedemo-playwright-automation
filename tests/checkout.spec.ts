/// <reference types="node" />
import { test, expect } from '../fixtures/pages';
import { readFile } from 'fs/promises';


test('checkout First Name mandatory', async ({ checkoutPage }) => {
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('', '123', '123');
  await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');

});

test('checkout Last Name mandatory', async ({ checkoutPage }) => {
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '', '123');
  await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');

});
test('checkout Zip/Postal Code mandatory', async ({ checkoutPage }) => {
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '');
  await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');

});
test('checkout overview', async ({ checkoutPage }) => {
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '123');
  await expect(checkoutPage.itemName).toBeVisible();
  await expect(checkoutPage.itemQuantity).toHaveText('1');
});
test('checkout finish', async ({ checkoutPage }) => {
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '123');
  await checkoutPage.finishButton.click();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
 
});
test('checkout generate pdf', async ({ page, checkoutPage }, testInfo) => {
  await checkoutPage.goto();

  await checkoutPage.checkoutButton.click();
  await checkoutPage.fillDetails('123', '123', '123');
  await checkoutPage.finishButton.click();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Generate pdf order' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  const downloadedFile = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(downloadedFile);
  expect((await readFile(downloadedFile)).subarray(0, 4).toString()).toBe('%PDF');
});

