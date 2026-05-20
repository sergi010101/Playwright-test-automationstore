export class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://automationteststore.com/');
    await this.page.getByRole('link', { name: 'Login or register' }).click();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.locator('#AccountFrm_firstname').waitFor({ state: 'visible', timeout: 10000 });
  }

  async fillPersonalInfo(firstName, lastName) {
    await this.page.locator('#AccountFrm_firstname').fill(firstName);
    await this.page.locator('#AccountFrm_lastname').fill(lastName);
  }

  async fillAddress(address, city, postcode, countryId, zoneId) {
    await this.page.locator('#AccountFrm_address_1').fill(address);
    await this.page.locator('#AccountFrm_city').fill(city);
    await this.page.locator('#AccountFrm_postcode').fill(postcode);
    await this.page.locator('#AccountFrm_country_id').selectOption(countryId);
    await this.page.locator('#AccountFrm_zone_id').selectOption(zoneId);
  }

  async fillLoginDetails(email, login, password) {
    await this.page.locator('#AccountFrm_email').fill(email);
    await this.page.locator('#AccountFrm_loginname').fill(login);
    await this.page.locator('#AccountFrm_password').fill(password);
    await this.page.locator('#AccountFrm_confirm').fill(password);
  }

  async agreeAndSubmit() {
    await this.page.getByRole('radio', { name: 'No' }).check();
    await this.page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page
      .getByRole('link', { name: 'Continue' })
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
