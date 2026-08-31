import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly lastNameInput: Locator;
  readonly firstNameInput: Locator;
  readonly zipPostalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly itemName: Locator;
  readonly itemQuantity: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.lastNameInput = page.getByRole('textbox', {name: 'Last Name'});
    this.firstNameInput = page.getByRole('textbox', {name: 'First Name'});
    this.zipPostalCodeInput = page.getByRole('textbox', {name: 'Zip/Postal Code'});
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.errorMessage = page.locator('[data-test="error"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]')
   this.itemQuantity = page.locator('[data-test="item-quantity"]')
   this.finishButton = page.getByRole('button', { name: 'Finish' })
   this.completeHeader = page.locator('[data-test="complete-header"]')
  }

async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async fillDetails(firstName = '', lastName = '', zipPostalCode = ''){
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.zipPostalCodeInput.fill(zipPostalCode)
    await this.continueButton.click()
  }
}