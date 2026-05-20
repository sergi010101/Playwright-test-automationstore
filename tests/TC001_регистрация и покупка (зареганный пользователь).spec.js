import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { CheckoutPage } from '../pages/CheckoutPage';

function generateUniqueUser() {
  const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 10000);
  return {
    email: `sergey.${uniqueSuffix}@gmail.com`,
    login: `sergey_login_${uniqueSuffix}`,
    firstname: 'Sergey',
    lastname: 'Tester',
    address: 'Street 123',
    city: 'Minsk',
    postcode: '111111',
    countryId: '20',
    zoneId: '339',
    password: '1234567',
  };
}

test.describe('Registration and Purchase', () => {
  test('TC001_registrationAndPurchaseWithUniqueData', async ({ page }) => {
    const user = generateUniqueUser();
    const registrationPage = new RegistrationPage(page);
    const checkoutPage = new CheckoutPage(page);

    await registrationPage.goto();
    await registrationPage.fillPersonalInfo(user.firstname, user.lastname);
    await registrationPage.fillAddress(
      user.address,
      user.city,
      user.postcode,
      user.countryId,
      user.zoneId,
    );
    await registrationPage.fillLoginDetails(user.email, user.login, user.password);
    await registrationPage.agreeAndSubmit();

    await checkoutPage.addFirstProductToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.confirmOrder();

    await expect(page.locator('.maintext')).toContainText('Your Order Has Been Processed!');
  });
});
