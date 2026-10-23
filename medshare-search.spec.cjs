
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://medshare-5u9n.onrender.com';

test('TC-S01: Search medicines by name', async ({ page }) => {
  // Open the login page
  await page.goto(`${BASE_URL}/login.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  const email = process.env.MEDSHARE_TEST_EMAIL;
  const password = process.env.MEDSHARE_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Set MEDSHARE_TEST_EMAIL and MEDSHARE_TEST_PASSWORD first.'
    );
  }

  // Sign in with the existing Recipient account
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/dashboard\.html/, {
    timeout: 15000
  });

  // Search for a medicine visible in your dashboard
  const searchBox = page.getByPlaceholder('e.g., paracetamol');
  await searchBox.fill('paracetamol');
  await page.getByRole('button', { name: 'Search' }).click();

  // Verify the medicine appears in the results
  await expect(
    page.getByText('paracetamol', { exact: true })
  ).toBeVisible();
});



test('TC-S02: Filter medicines by category', async ({ page }) => {
  await page.goto(`${BASE_URL}/login.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  const email = process.env.MEDSHARE_TEST_EMAIL;
  const password = process.env.MEDSHARE_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Set the Recipient login environment variables first.');
  }

  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/dashboard\.html/, {
    timeout: 15000
  });

  const categoryBox = page.getByPlaceholder('e.g., pain, fever');
  await categoryBox.fill('pain');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(
    page.getByText('paracetamol', { exact: true })
  ).toBeVisible();
});



test('TC-S03: Filter medicines by expiry date', async ({ page }) => {
  await page.goto(`${BASE_URL}/login.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  const email = process.env.MEDSHARE_TEST_EMAIL;
  const password = process.env.MEDSHARE_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Set the Recipient login environment variables first.');
  }

  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/dashboard\.html/, {
    timeout: 15000
  });

  const expiryFilter = page.locator('input[type="date"]').first();
  await expect(expiryFilter).toBeVisible();

  // Use a date shown on your medicine card.
  await expiryFilter.fill('2027-01-15');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('body')).toBeVisible();
});
