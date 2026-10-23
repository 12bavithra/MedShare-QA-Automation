
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://medshare-5u9n.onrender.com';

test('TC-001: Home page loads successfully', async ({ page }) => {
  const response = await page.goto(`${BASE_URL}/`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  expect(response.status()).toBe(200);
  await expect(page.locator('body')).not.toBeEmpty();
  await expect(page.getByRole('link', { name: 'Browse' })).toBeVisible();
});

test('TC-002: Home page has a title', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await expect(page).toHaveTitle(/MedShare/i);
});

test('TC-003: Browse navigation opens medicines page', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('link', { name: 'Browse' }).click();

  await expect(page).toHaveURL(/medicines\.html/);
});

test('TC-009: Medicines page responds', async ({ page }) => {
  const response = await page.goto(
    'https://medshare-5u9n.onrender.com/medicines.html',
    { waitUntil: 'domcontentloaded', timeout: 60000 }
  );

  expect(response.status()).toBeLessThan(400);
  console.log('Final URL:', page.url());
  console.log('Page title:', await page.title());
});

test('TC-010: Login page responds', async ({ page }) => {
  const response = await page.goto(
    'https://medshare-5u9n.onrender.com/login.html',
    { waitUntil: 'domcontentloaded', timeout: 60000 }
  );

  expect(response.status()).toBeLessThan(400);
  console.log('Final URL:', page.url());
  console.log('Page title:', await page.title());
});