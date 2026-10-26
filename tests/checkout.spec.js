const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';

test('user adds two items to cart and completes checkout', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html$/);

  // Add two products to the cart.
  await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();
  await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart\.html$/);
  await expect(page.locator('.cart_item')).toHaveCount(2);

  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);

  await page.getByPlaceholder('First Name').fill('Field');
  await page.getByPlaceholder('Last Name').fill('Officer');
  await page.getByPlaceholder('Zip/Postal Code').fill('00100');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.locator('.cart_item')).toHaveCount(2);

  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  await expect(page.getByText('Your order has been dispatched', { exact: false })).toBeVisible();
});
