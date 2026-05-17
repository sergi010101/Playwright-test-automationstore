import { test, expect } from '@playwright/test';

test('the first test', async ({ page }) => {
  // 1. Переходим на страницу
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // 2. Находим поле ввода и добавляем первую задачу
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('1) do it');
  await page.keyboard.press('Enter');

  // 3. Добавляем вторую задачу
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('2) do smth');
  await page.keyboard.press('Enter');

  // 4. Проверяем, что текст появился в списке задач
  await expect(page.locator('.todo-list')).toContainText('1) do it');
});
