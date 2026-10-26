const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';
const csvPath = path.join(__dirname, '..', 'test-data', 'users.csv');

function readCsv(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  const headers = lines.shift().split(',').map(value => value.trim());

  return lines.map(line => {
    const values = line.split(',').map(value => value.trim());
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
}

const users = readCsv(csvPath);

for (const user of users) {
  test(`CSV login: ${user.username} (${user.expected})`, async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByPlaceholder('Username').fill(user.username);
    await page.getByPlaceholder('Password').fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if (user.expected === 'success') {
      await expect(page).toHaveURL(/inventory\.html$/);
      await expect(page.getByText('Products', { exact: true })).toBeVisible();
    } else {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }
  });
}
