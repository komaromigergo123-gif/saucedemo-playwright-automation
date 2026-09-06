import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly itemName: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly itemQuantity: Locator;
  readonly itemTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.itemTotal = page.locator('[data-test="inventory-item-price"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async removeItem(): Promise<void> {
    await this.removeButton.click();
  }

  async getTotalPrice(): Promise<number> {
    const itemPrices = await this.itemTotal.allTextContents();

    return itemPrices.reduce(
      (total, price) => total + Number(price.replace('$', '')),
      0,
    );
  }
}