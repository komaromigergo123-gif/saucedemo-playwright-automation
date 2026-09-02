import { test as setup, expect } from '../fixtures/pages';


const authFile = 'playwright/.auth/checkout.json';

setup('add item to cart', async ({ page, productsPage }) => {
  await productsPage.goto();
  await productsPage.addToCart();
  

  await page.context().storageState({
    path: authFile,
  });
});