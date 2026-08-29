import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/checkout.json';

setup('add item to cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.context().storageState({
    path: authFile,
  });
});