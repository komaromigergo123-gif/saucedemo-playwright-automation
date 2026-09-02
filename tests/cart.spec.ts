import { test, expect } from '../fixtures/pages';


test('remove product from cart', async ({ cartPage }) => {
  await cartPage.goto();

  
  await expect(cartPage.itemName).toBeVisible();
  await cartPage.removeButton.click();
  await expect(cartPage.itemName).not.toBeVisible();
});