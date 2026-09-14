import { Locator, Page } from '@playwright/test';

export class ItemDetailsPage {
  readonly page: Page;
  readonly productDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
  }
}