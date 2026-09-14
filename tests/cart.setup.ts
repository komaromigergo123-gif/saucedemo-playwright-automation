import { test as setup } from '../fixtures/pages';

const authFile = 'playwright/.auth/cart.json';

setup('add item to cart', async ({ page, inventoryPage }) => {
  await inventoryPage.goto();
  await inventoryPage.addToCart();

  await page.context().storageState({
    path: authFile,
  });
});
