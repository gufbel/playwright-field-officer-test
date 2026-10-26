const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';

test('valid user can log in', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('invalid credentials show a login error', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Username').fill('not_a_real_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match'
  );
});
