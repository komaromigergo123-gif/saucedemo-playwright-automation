import { test, expect } from '../fixtures/pages';
import { users } from '../data/users';
import { checkoutDetails } from '../data/checkoutDetails';
import { inventoryItems } from '../data/inventoryItems';

test.describe('@smoke', () => {
  test('end-to-end purchase journey: login to order confirmation', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    await test.step('log in as a standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
      await expect(page).toHaveURL(/inventory\.html/);
    });

    await test.step('add an item to the cart from the inventory page', async () => {
      await expect(inventoryPage.itemName.first()).toHaveText(
        inventoryItems[0],
      );

      await inventoryPage.addToCart();
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await test.step('view the item in the cart and proceed to checkout', async () => {
      await cartPage.goto();

      await expect(cartPage.cartItems).toHaveCount(1);
      await cartPage.checkoutButton.click();
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    await test.step('fill in checkout information', async () => {
      await checkoutStepOnePage.fillDetails(
        checkoutDetails.firstName,
        checkoutDetails.lastName,
        checkoutDetails.postalCode,
      );
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

    await test.step('review the order overview', async () => {
      await expect(checkoutStepTwoPage.itemName).toHaveCount(1);
      await checkoutStepTwoPage.finishButton.click();
    });

    await test.step('confirm the order is complete', async () => {
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutCompletePage.completeHeader).toHaveText(
        'Thank you for your order!',
      );
    });
  });
});
