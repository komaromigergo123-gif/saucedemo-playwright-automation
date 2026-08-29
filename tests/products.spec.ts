import { test, expect } from '@playwright/test';



test('products visible', async ({ page }) => {
  await page.goto('/inventory.html');

const expectedProducts = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
];

await expect(page.locator('[data-test="inventory-item-name"]'))
  .toHaveText(expectedProducts);

await expect(page.locator('[data-test$="-img"]')).toHaveCount(expectedProducts.length);
await expect(page.locator('[data-test$="-price"]')).toHaveCount(expectedProducts.length);
});

test('product details', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.getByText('Sauce Labs Backpack').click();
  await expect(page.getByText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")).toBeVisible();
});

test('add product to cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  
});
test('remove product from cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await page.getByRole('button',{ name: 'Remove' } ).click();
  await expect(page.getByText('Sauce Labs Backpack')).not.toBeVisible();
});

test('product page sort a-z', async ({ page }) => {
  await page.goto('/inventory.html');
  const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
  expect(names).toEqual([...names].sort());


});
test('product page sort z-a', async ({ page }) => {
  await page.goto('/inventory.html');
  const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();

  await page.locator('[data-test="product-sort-container"]').click();
  await page.selectOption('[data-test="product-sort-container"]', 'za');
  const namesReversed = await page.locator('[data-test="inventory-item-name"]').allTextContents();
  
  expect(namesReversed).toEqual([...names].sort().reverse());

});
test('product page sort low-high', async ({ page }) => {
  await page.goto('/inventory.html');
  
  await page.locator('[data-test="product-sort-container"]').click();
  await page.selectOption('[data-test="product-sort-container"]', 'lohi');

  const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const numbers = prices.map(price => Number(price.replace('$', '')));

  expect(numbers).toEqual(numbers.toSorted((a, b) => a - b));

});
test('product page sort high-low', async ({ page }) => {
  await page.goto('/inventory.html');
  
  await page.locator('[data-test="product-sort-container"]').click();
  await page.selectOption('[data-test="product-sort-container"]', 'hilo');

  const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const numbers = prices.map(price => Number(price.replace('$', '')));

  expect(numbers).toEqual(numbers.toSorted((a, b) => b - a));

});