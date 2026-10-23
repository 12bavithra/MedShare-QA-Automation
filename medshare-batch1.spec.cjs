
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://medshare-5u9n.onrender.com';

test('TC-004: Registration page opens', async ({ page }) => {
  await page.goto(`${BASE_URL}/register.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page.locator('body')).toBeVisible();
  await expect(page).toHaveURL(/register\.html/);
});

test('TC-005: Login page opens', async ({ page }) => {
  await page.goto(`${BASE_URL}/login.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/login\.html/);
  await expect(page.getByText('Welcome Back')).toBeVisible({
    timeout: 15000
  });
  await expect(page.getByText('Email Address')).toBeVisible();
  await expect(page.getByText('Password', { exact: true })).toBeVisible();
});

test('TC-009: Browse navigation is available', async ({ page }) => {
  await page.goto(BASE_URL, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(
    page.getByRole('link', { name: 'Browse' })
  ).toBeVisible({ timeout: 15000 });
});


test('TC-022: Signed-out user is redirected to login', async ({ page }) => {
  await page.goto(`${BASE_URL}/medicines.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/login\.html/);
  await expect(page).toHaveTitle(/Login/i);
});
