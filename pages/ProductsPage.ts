import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly openCart: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly sortButton: Locator;
  readonly productDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' })
    this.openCart = page.locator('[data-test="shopping-cart-link"]')
    this.itemName = page.locator('[data-test="inventory-item-name"]')
    this.itemPrice = page.locator('[data-test="inventory-item-price"]')
    this.sortButton = page.locator('[data-test="product-sort-container"]')
    this.productDescription = page.locator('[data-test="inventory-item-desc"]')
  }

async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

async addToCart(){
   await this.addToCartButton.first().click()
   await this.openCart.click()

}

async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
   await this.sortButton.selectOption(value)
}

}