# Saucedemo Frontend Test Automation with Playwright

This repository contains a sample frontend automation framework built using Playwright and targeting the demo application at https://www.saucedemo.com/
.
The project does not aim to cover the entire application. Instead, it serves as a clean, well-structured example of how to design a scalable Playwright test framework, including page object architecture, reusable components, environment configuration, and GitHub Actions integration.

A CI workflow is included and runs automatically on every Pull Request.

## 📁 Page Objects

The framework follows the Page Object Model and includes dedicated classes for:

1. Login Page
2. Menu
3. Top Bar
4. Inventory Page
5. Product Page
6. Shopping Cart Page

Reusable UI components—such as lists, cards, and product tiles—are implemented as separate classes to keep their logic encapsulated and maintainable.

## 🧪 Tests

This project currently includes tests for:

1. Login functionality
2. Inventory Page interactions
3. Product Page behaviors

A visual regression test example is also included in the Product Page suite to demonstrate Playwright’s snapshot comparison capabilities.

## ⚙️ Setup

1. Install all dependencies

```bash
npm install
```

2. Install playwright browsers

```bash
npx playwright install
```

3. copy `.env_sample` to `.env` and provide valid Saucedemo credentials (from https://www.saucedemo.com/)

## ▶️ Running tests

### Local Execution

Use one of below:

- Run all tests (Chrome)

```bash
npm run tests:chrome
```

- Run all tests (Firefox)

```bash
npm run tests:firefox
```

- Run all tests (WebKit)

```bash
npm run tests:webkit
```

- Run visual tests only

```bash
npm run tests:visual
```

- Run all functional tests

```bash
npm run tests
```

All commands (except the visual suite) run functional tests only.

### 🚀 GitHub Actions (CI)

A GitHub Actions workflow is included in the repository.  
It automatically runs the full test suite when a Pull Request is:

- opened
- synchronized (new commits)
- reopened

Additionally, the workflow can be triggered manually from the Actions tab.
