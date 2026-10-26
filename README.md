# Playwright Field Officer Test Automation

A starter UI automation project using **JavaScript + Playwright Test** and the public SauceDemo practice website.

[Important scope: 
This case suite automates login, adding two products to a cart, checkout, and order confirmation.]

Test coverage

1. Positive login — valid credentials reach the Products/inventory page.
2. Negative login — invalid credentials display a login error.
3. Cart and checkout journey — logs in, adds two products, verifies two cart items, completes checkout, and asserts the order confirmation page.
4. CSV-driven login — runs a separate login test for each user in `test-data/users.csv` (three demo users included).

Requirements

- Node.js 18
- npm
- Internet access to reach https://www.saucedemo.com

1. Install dependencies

npm install
npx playwright install chromium

2. Run all tests

npm test

3. Run with a visible browser

npm run test:headed

4. Open Playwright's HTML report

npm run test:report

Project structure

playwright-field-officer-test/
├── tests/
│   ├── login.spec.js
│   ├── checkout.spec.js
│   └── csv-users.spec.js
├── test-data/
│   └── users.csv
├── package.json
├── playwright.config.js
├── .gitignore
└── README.

CSV test data

test-data/users.csv uses these columns:
csv
username,password,expected
standard_user,secret_sauce,success
problem_user,secret_sauce,success
performance_glitch_user,secret_sauce,success

To add another test user, add a row. Use `success` for an expected successful login. Any other expected value currently follows the negative-login assertion branch.

Configure a different demo environment

macOS/Linux
bash
BASE_URL="https://your-authorized-test-site.example" npm test

PowerShell
powershell
$env:BASE_URL = "https://your-authorized-test-site.example"
npm test

