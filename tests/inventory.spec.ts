import { test, expect } from '../fixtures/pages';
import { inventoryItems } from '../data/inventoryItems';

test.describe('@smoke', () => {
  test('inventory items visible', async ({ page, inventoryPage }) => {
    await inventoryPage.goto();

    await expect(inventoryPage.itemName).toHaveText(inventoryItems);

    await expect(page.locator('[data-test$="-img"]')).toHaveCount(
      inventoryItems.length,
    );
    await expect(page.locator('[data-test$="-price"]')).toHaveCount(
      inventoryItems.length,
    );
  });
});

test('inventory item details', async ({ inventoryPage, itemDetailsPage }) => {
  await inventoryPage.goto();
  await inventoryPage.itemName.first().click();
  await expect(itemDetailsPage.productDescription).toHaveText(
    'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
  );
});

test.describe('@smoke', () => {
  test('add inventory item to cart', async ({ inventoryPage }) => {
    await inventoryPage.goto();

    await inventoryPage.addToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});

test('inventory page sort a-z', async ({ inventoryPage }) => {
  await inventoryPage.goto();
  const names = await inventoryPage.itemName.allTextContents();
  expect(names).toEqual([...names].sort());
});
test('inventory page sort z-a', async ({ inventoryPage }) => {
  await inventoryPage.goto();
  const names = await inventoryPage.itemName.allTextContents();

  await inventoryPage.sortButton.click();
  await inventoryPage.sortBy('za');
  const namesReversed = await inventoryPage.itemName.allTextContents();

  expect(namesReversed).toEqual([...names].sort().reverse());
});
test('inventory page sort low-high', async ({ inventoryPage }) => {
  await inventoryPage.goto();

  await inventoryPage.sortButton.click();
  await inventoryPage.sortBy('lohi');

  const prices = await inventoryPage.itemPrice.allTextContents();
  const numbers = prices.map((price) => Number(price.replace('$', '')));

  expect(numbers).toEqual(numbers.toSorted((a, b) => a - b));
});
test('inventory page sort high-low', async ({ inventoryPage }) => {
  await inventoryPage.goto();

  await inventoryPage.sortButton.click();
  await inventoryPage.sortBy('hilo');

  const prices = await inventoryPage.itemPrice.allTextContents();
  const numbers = prices.map((price) => Number(price.replace('$', '')));

  expect(numbers).toEqual(numbers.toSorted((a, b) => b - a));
});