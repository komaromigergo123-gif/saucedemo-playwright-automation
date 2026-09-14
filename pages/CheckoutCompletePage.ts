import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly generatePdfButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.generatePdfButton = page.getByRole('button', {
      name: 'Generate pdf order',
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout-complete.html');
  }
}
