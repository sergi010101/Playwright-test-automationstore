export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async addFirstProductToCart() {
    await this.page.getByRole('link', { name: 'Home', exact: true }).click();
    await this.page.getByTitle('Add to Cart').first().click();
  }

  async proceedToCheckout() {
    await this.page.getByRole('link', { name: 'Cart' }).first().click();
    await this.page.locator('#cart_checkout2').click();
    await this.page.waitForURL(/checkout\/confirm/, { timeout: 15000 });
    await this.page
      .locator('button:has-text("Confirm Order")')
      .waitFor({ state: 'visible', timeout: 20000 });
  }

  async confirmOrder() {
    await this.page.locator('button:has-text("Confirm Order")').first().click();
  }
}
