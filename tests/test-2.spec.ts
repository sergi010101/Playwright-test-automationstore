import { test, expect } from '@playwright/test';

test('Проверка отображения UI header', async ({ page }) => {
  // Recording...
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await page.getByRole('link', { name: 'MCP', exact: true }).click();
  await expect(page.getByRole('link', { name: 'CLI', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Playwright enables reliable' }).locator('span'),
  ).toBeVisible();
});
test('Проверка названий UI header', async ({ page }) => {
  // Recording...
  await page.goto('https://playwright.dev/');
  await page.pause();
  await expect(page.getByRole('main')).toContainText('Playwright Test');
  await expect(page.getByLabel('Main', { exact: true })).toContainText('Node.js');
  await expect(page.getByLabel('Main', { exact: true }).locator('b')).toContainText('Playwright');
  await expect(page.locator('h1')).toContainText('Playwright');
});
