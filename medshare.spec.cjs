const { test, expect } = require('@playwright/test');

test('MedShare website loads successfully', async ({ page }) => {
  const response = await page.goto('https://medshare-5u9n.onrender.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  await expect(page.locator('body')).not.toBeEmpty();
  console.log('MedShare loaded. HTTP status:', response.status());
});
