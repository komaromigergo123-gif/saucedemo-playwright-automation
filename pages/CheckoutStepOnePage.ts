import { Page, Locator } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly lastNameInput: Locator;
  readonly firstNameInput: Locator;
  readonly zipPostalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.zipPostalCodeInput = page.getByRole('textbox', {
      name: 'Zip/Postal Code',
    });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillDetails(firstName = '', lastName = '', zipPostalCode = '') {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipPostalCodeInput.fill(zipPostalCode);
    await this.continueButton.click();
  }
}
