
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://medshare-5u9n.onrender.com';

test('TC-002: Registration page and form are visible', async ({ page }) => {
  await page.goto(`${BASE_URL}/register.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page.locator('form').first()).toBeVisible();
  await expect(page.locator('input').first()).toBeVisible();
});

test('TC-009: Login page displays required elements', async ({ page }) => {
  await page.goto(`${BASE_URL}/login.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page.getByText('Welcome Back')).toBeVisible();
  await expect(page.getByText('Email Address')).toBeVisible();
  await expect(
    page.getByText('Password', { exact: true })
  ).toBeVisible();
});

test('TC-010: Login email and password inputs are visible', async ({ page }) => {
  await page.goto(`${BASE_URL}/login.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(
    page.locator('input[type="email"]').first()
  ).toBeVisible();

  await expect(
    page.locator('input[type="password"]').first()
  ).toBeVisible();
});
