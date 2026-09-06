import { test, expect } from '../fixtures/pages';


test('remove product from cart', async ({ cartPage }) => {
  await cartPage.goto();

  
  await expect(cartPage.itemName).toBeVisible();
  await cartPage.removeButton.click();
  await expect(cartPage.itemName).not.toBeVisible();
});
test('check quantity in cart', async ({ cartPage }) => {
  await cartPage.goto();

  await expect(cartPage.itemQuantity).toBeVisible();
  await expect(cartPage.itemQuantity).toHaveText('1');
});
test('updates the total price after adding another item', async ({ cartPage, productsPage }) => {
  await cartPage.goto();
  const totalBeforeAddingItem = await cartPage.getTotalPrice();

  await productsPage.goto();
  await productsPage.addToCart();

  await cartPage.goto();
  const totalAfterAddingItem = await cartPage.getTotalPrice();

  expect(totalAfterAddingItem).toBeGreaterThan(totalBeforeAddingItem);
});