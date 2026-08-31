import { test, expect } from '../fixtures/pages';


test('products visible', async ({ page, productsPage }) => {
  await productsPage.goto();

  const expectedProducts = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ];

  await expect(productsPage.itemName).toHaveText(expectedProducts);

  await expect(page.locator('[data-test$="-img"]')).toHaveCount(expectedProducts.length);
  await expect(page.locator('[data-test$="-price"]')).toHaveCount(expectedProducts.length);
});

test('product details', async ({ productsPage }) => {
  await productsPage.goto();
  await productsPage.itemName.first().click();
  await expect(productsPage.productDescription).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")
});

test('add product to cart', async ({ productsPage }) => {
  await productsPage.goto();

  await productsPage.addToCart();
  await expect(productsPage.itemName).toBeVisible();

});
test('remove product from cart', async ({ page, productsPage }) => {
  await productsPage.goto();

  await productsPage.addToCart();
  await expect(productsPage.itemName).toBeVisible();
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(productsPage.itemName).not.toBeVisible();
});

test('product page sort a-z', async ({ productsPage }) => {
  await productsPage.goto();
  const names = await (productsPage.itemName).allTextContents();
  expect(names).toEqual([...names].sort());


});
test('product page sort z-a', async ({ productsPage }) => {
  await productsPage.goto();
  const names = await (productsPage.itemName).allTextContents();

  await productsPage.sortButton.click();
  await productsPage.sortBy('za');
  const namesReversed = await (productsPage.itemName).allTextContents();

  expect(namesReversed).toEqual([...names].sort().reverse());

});
test('product page sort low-high', async ({ productsPage }) => {
  await productsPage.goto();

  await productsPage.sortButton.click();
  await productsPage.sortBy('lohi');

  const prices = await (productsPage.itemPrice).allTextContents();
  const numbers = prices.map(price => Number(price.replace('$', '')));

  expect(numbers).toEqual(numbers.toSorted((a, b) => a - b));

});
test('product page sort high-low', async ({ productsPage }) => {
  await productsPage.goto();

  await productsPage.sortButton.click();
  await productsPage.sortBy('hilo');

  const prices = await (productsPage.itemPrice).allTextContents();
  const numbers = prices.map(price => Number(price.replace('$', '')));

  expect(numbers).toEqual(numbers.toSorted((a, b) => b - a));

});