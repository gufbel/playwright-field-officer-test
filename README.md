# Playwright Field Officer Test

 Project Overview

This project demonstrates UI test automation using Playwright and JavaScript against https://www.saucedemo.com. It uses an e-commerce workflow as a demonstration of the type of end-to-end checks that can support a field officer's order-processing workflow.

The suite covers login validation, cart operations, checkout, order confirmation, and data-driven login tests using CSV test data.

 Technologies Used

- **Playwright Test** — browser automation and test execution
- **JavaScript / Node.js** — test implementation
- **CSV** — data-driven test inputs
- **GitHub Actions** — continuous integration
- **HTML Reporter** — test results and failure investigation

 Automated Test Coverage

- **Login:** verify valid login and reject invalid or locked-out users.
- **Shopping cart:** add two products and verify the checkout journey.
- **Checkout:** complete the checkout process and assert the order confirmation.
- **CSV-driven testing:** run login scenarios using user data stored in `test-data/users.csv`.
- **Failure evidence:** capture screenshots, traces, and videos on test failures, subject to the Playwright configuration.

 Project Structure

```text
.
├── .github/
│   └── workflows/
│       └registry.yml
├── test-data/
│   └── users.csv
├── tests/
│   ├── checkout.spec.js
│   ├── csv-users.spec.js
│   └── login.spec.js
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

 Prerequisites

- Node.js and npm
- Git
- Access to the repository

 Installation

Clone the repository and move into the project directory:

```bash
git clone https://github.com/gufbel/playwright-field-officer-test.git
cd playwright-field-officer-test
```

Install the locked project dependencies:

```bash
npm ci
```

Install the Chromium browser required by the tests:

```bash
npx playwright install chromium
```

 Running the Tests

Run the full test suite:

```bash
npm test
```

Run tests with a visible browser:

```bash
npm run test:headed
```

Open Playwright's HTML report after a test run:

```bash
npm run test:report
```

The application base URL defaults to `https://www.saucedemo.com`. It can be overridden using the `BASE_URL` environment variable.

 Continuous Integration — GitHub Actions

The workflow is defined in .github/workflows/registry.yml.

The pipeline:

1. Runs automatically on pushes and pull requests, and can also be started manually.
2. Checks out the repository and sets up Node.js.
3. Installs dependencies using `npm ci`.
4. Installs Chromium and its required system dependencies.
5. Runs the Playwright test suite.
6. Uploads the HTML report and test results as downloadable artifacts, including when tests fail, where the relevant files are generated.

A failed test causes the test step and workflow run to fail, making test failures visible to the team.

 Three CI Standards for Six Teams

All six teams must follow a consistent CI/CD workflow that runs automated tests on every push and pull request. Dependencies and runtime versions must be controlled through lockfiles and documented configuration so that builds are repeatable. Every pipeline must fail when required tests fail and publish test reports and failure evidence as downloadable artifacts. The main branch must be protected through pull-request reviews and required successful status checks before changes are merged. Teams may customize their own test suites and deployment steps, but all must follow shared standards for security, reporting, and build quality.

 Test Reports and Artifacts

After a GitHub Actions run, open the workflow under the repository's **Actions** tab. Select the relevant run and download the available HTML report or test-results artifacts to investigate the outcome.

 Scope and Limitations

SauceDemo is a demonstration shopping application, not a loan-management platform. The automated shopping and checkout journey is used to demonstrate transferable UI automation skills; it does not perform or approve real loan applications.

