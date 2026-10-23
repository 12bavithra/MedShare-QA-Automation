
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://medshare-5u9n.onrender.com';

test('TC-B01: Medicines page opens successfully', async ({ page }) => {
  const response = await page.goto(`${BASE_URL}/medicines.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  await expect(page.locator('body')).toBeVisible();
});


test('TC-B02: Signed-out user is redirected to login', async ({ page }) => {
  await page.goto(`${BASE_URL}/medicines.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveURL(/login\.html/);
});


test('TC-B03: Medicines page contains visible content', async ({ page }) => {
  await page.goto(`${BASE_URL}/medicines.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  const bodyText = await page.locator('body').innerText();
  expect(bodyText.trim().length).toBeGreaterThan(0);
});

test('TC-B04: Medicines page has no browser page errors', async ({ page }) => {
  const pageErrors = [];

  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  await page.goto(`${BASE_URL}/medicines.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForLoadState('networkidle').catch(() => {});

  expect(pageErrors).toEqual([]);
});
