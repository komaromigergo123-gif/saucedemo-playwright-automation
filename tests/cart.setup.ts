import { test as setup } from '../fixtures/pages';

const authFile = 'playwright/.auth/cart.json';

setup('add item to cart', async ({ page, productsPage }) => {
  await productsPage.goto();
  await productsPage.addToCart();

  await page.context().storageState({
    path: authFile,
  });
});
