import { Page, Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly itemQuantity: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout-step-two.html');
  }
}
