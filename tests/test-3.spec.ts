import { test, expect } from '@playwright/test';

test('Регистрация и покупка с уникальными данными', async ({ page }) => {
  // Генерируем уникальные данные для каждой итерации
  const randomId = Math.floor(Math.random() * 100000);
  const userEmail = `sergey${randomId}@gmail.com`;
  const userLogin = `sergey_login${randomId}`;

  await page.goto('https://automationteststore.com/');
  await page.getByRole('link', { name: 'Login or register' }).click();
  await page.getByRole('button', { name: ' Continue' }).click();

  await page.locator('#AccountFrm_firstname').fill('Sergey');
  await page.locator('#AccountFrm_lastname').fill('Tester');

  // Используем наши переменные вместо фиксированных строк
  await page.locator('#AccountFrm_email').fill(userEmail);

  await page.locator('#AccountFrm_address_1').fill('Street 123');
  await page.locator('#AccountFrm_city').fill('Minsk');
  await page.locator('#AccountFrm_country_id').selectOption('20');
  await page.locator('#AccountFrm_zone_id').selectOption('339');
  await page.locator('#AccountFrm_postcode').fill('111111');

  // Логин тоже должен быть уникальным
  await page.locator('#AccountFrm_loginname').fill(userLogin);

  await page.locator('#AccountFrm_password').fill('1234567');
  await page.locator('#AccountFrm_confirm').fill('1234567');

  await page.getByRole('radio', { name: 'No' }).check();
  await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
  await page.getByRole('button', { name: ' Continue' }).click();

  // Проверяем, что регистрация прошла успешно (появилась кнопка Continue)
  await page.getByRole('link', { name: ' Continue' }).click();

  // Дальше процесс покупки
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await page.getByTitle('Add to Cart').first().click();
  await page.getByRole('link', { name: '  Cart' }).click();
  await page.locator('#cart_checkout2').click();
  await page.getByRole('button', { name: ' Confirm Order' }).click();

  // Финальная проверка успеха
  await expect(page.locator('.maintext')).toContainText('Your Order Has Been Processed!');
});
