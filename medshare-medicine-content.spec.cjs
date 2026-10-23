
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://medshare-5u9n.onrender.com';

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/login.html`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Sign in using credentials supplied through environment variables.
  const email = process.env.MEDSHARE_TEST_EMAIL;
  const password = process.env.MEDSHARE_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Set MEDSHARE_TEST_EMAIL and MEDSHARE_TEST_PASSWORD before running.'
    );
  }

  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/dashboard\.html/, {
    timeout: 15000
  });
});

test('TC-M01: Recipient dashboard displays available medicines', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Available Medicines' })
  ).toBeVisible();
});

test('TC-M02: Medicine search field is available', async ({ page }) => {
  await expect(page.getByPlaceholder('e.g., paracetamol')).toBeVisible();
});

test('TC-M03: Category filter is available', async ({ page }) => {
  await expect(page.getByPlaceholder('e.g., pain, fever')).toBeVisible();
});

test('TC-M04: Expiry date filter is available', async ({ page }) => {
  await expect(page.locator('input[type="date"]').first()).toBeVisible();
});


test('TC-M05: Medicine cards display names and quantities', async ({ page }) => {
  await expect(page.getByText('paracetamol', { exact: true })).toBeVisible();
  await expect(page.getByText('aspirin', { exact: true })).toBeVisible();
  await expect(page.getByText('metformin', { exact: true })).toBeVisible();

  // Verify medicine cards show quantity values.
  await expect(page.getByText('6', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('4', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('8', { exact: true }).first()).toBeVisible();
});

test('TC-M06: Request Medicine buttons are visible', async ({ page }) => {
  const buttons = page.getByRole('button', { name: 'Request Medicine' });
  await expect(buttons.first()).toBeVisible();
  expect(await buttons.count()).toBeGreaterThan(0);
});
