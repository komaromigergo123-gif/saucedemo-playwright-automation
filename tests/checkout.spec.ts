import { test, expect } from '../fixtures/pages';
import { readFile } from 'fs/promises';
import { checkoutDetails } from '../data/checkoutDetails';

test('cancel on checkout step one', async ({ page, checkoutStepOnePage }) => {
  await checkoutStepOnePage.goto();

  await checkoutStepOnePage.cancelButton.click();
  await expect(page).toHaveURL(/cart\.html/);
});

test('checkout First Name mandatory', async ({ checkoutStepOnePage }) => {
  await checkoutStepOnePage.goto();

  await checkoutStepOnePage.fillDetails(
    '',
    checkoutDetails.lastName,
    checkoutDetails.postalCode,
  );
  await expect(checkoutStepOnePage.errorMessage).toHaveText(
    'Error: First Name is required',
  );
});

test('checkout Last Name mandatory', async ({ checkoutStepOnePage }) => {
  await checkoutStepOnePage.goto();

  await checkoutStepOnePage.fillDetails(
    checkoutDetails.firstName,
    '',
    checkoutDetails.postalCode,
  );
  await expect(checkoutStepOnePage.errorMessage).toHaveText(
    'Error: Last Name is required',
  );
});
test('checkout Zip/Postal Code mandatory', async ({ checkoutStepOnePage }) => {
  await checkoutStepOnePage.goto();

  await checkoutStepOnePage.fillDetails(
    checkoutDetails.firstName,
    checkoutDetails.lastName,
    '',
  );
  await expect(checkoutStepOnePage.errorMessage).toHaveText(
    'Error: Postal Code is required',
  );
});
test('checkout overview', async ({ checkoutStepOnePage, checkoutStepTwoPage }) => {
  await checkoutStepOnePage.goto();

  await checkoutStepOnePage.fillDetails(
    checkoutDetails.firstName,
    checkoutDetails.lastName,
    checkoutDetails.postalCode,
  );
  await expect(checkoutStepTwoPage.itemName).toBeVisible();
  await expect(checkoutStepTwoPage.itemQuantity).toHaveText('1');
});
test.describe('@smoke', () => {
  test('checkout finish', async ({
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    await checkoutStepOnePage.goto();

    await checkoutStepOnePage.fillDetails(
      checkoutDetails.firstName,
      checkoutDetails.lastName,
      checkoutDetails.postalCode,
    );
    await checkoutStepTwoPage.finishButton.click();
    await expect(checkoutCompletePage.completeHeader).toHaveText(
      'Thank you for your order!',
    );
  });
});
test('checkout generate pdf', async ({
  page,
  checkoutStepOnePage,
  checkoutStepTwoPage,
  checkoutCompletePage,
}, testInfo) => {
  await checkoutStepOnePage.goto();

  await checkoutStepOnePage.fillDetails(
    checkoutDetails.firstName,
    checkoutDetails.lastName,
    checkoutDetails.postalCode,
  );
  await checkoutStepTwoPage.finishButton.click();

  const downloadPromise = page.waitForEvent('download');
  await checkoutCompletePage.generatePdfButton.click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  const downloadedFile = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(downloadedFile);
  expect((await readFile(downloadedFile)).subarray(0, 4).toString()).toBe(
    '%PDF',
  );
});
