import { test, expect } from '@playwright/test';

test('authenticated user can see products', async ({ page }) => {
  await page.goto('/inventory.html');

  await expect(page.getByText('Products')).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
});

test('user can open product details', async ({ page }) => {
  await page.goto('/inventory.html');

  await page.getByText('Sauce Labs Backpack').click();
  await expect(page.getByText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")).toBeVisible();
});

test('user can add product to cart', async ({ page }) => {
  await page.goto('/inventory.html');
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  
});