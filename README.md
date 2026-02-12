# sana-playwright-ts (TypeScript + CucumberJS + Playwright)

End-to-end (E2E) test automation project using:
- **TypeScript**
- **CucumberJS** for BDD (`.feature` files + step definitions)
- **Playwright** for browser automation
- **cucumber-html-reporter** for HTML reporting

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Reports](#reports)
- [Debugging (Traces, Screenshots)](#debugging-traces-screenshots)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)

---

## Prerequisites

- Node.js **20+** recommended
- npm
- Playwright browsers installed (see setup)

---

## Project Setup

1) Install dependencies:
    `npm install`
2) Install Playwright browsers:
    `npx playwright install`

---

## Environment Variables

### `SANA_BASE_URL` (required)
Base URL of the environment under test.
    `export SANA_BASE_URL="[https://your-sana-url.example](https://your-sana-url.example)"`


### `HEADLESS` (optional)
By default, the tests run headless. To run headed:
    `export HEADLESS="false"`

---

## Running Tests

### Run all BDD tests
   `npm run test:bdd`

### Run workflow scenarios only (tagged `@workflow`)
    npm run test:bdd:workflow

### Run with custom Cucumber CLI args (example)
    npm run test:bdd -- --tags "@first-test"

---

## Reports

### Cucumber JSON report
Cucumber is configured to generate a JSON report at:

- `playwright/.artifacts/cucumber-report.json`

### Generate HTML report

1) Run tests (generates the JSON report):
    npm run test:bdd
2) Generate HTML report:
   `npx cucumber-html-reporter -i playwright/.artifacts/cucumber-report.json -o playwright/.artifacts/cucumber-report.html`

Output:

- HTML report: `playwright/.artifacts/cucumber-html/index.html`

Notes:
- `playwright/.artifacts/` is generated content and should not be committed to git.

---

## Debugging (Traces, Screenshots)

On failure, Playwright artifacts are saved under:

- `playwright/.artifacts/cucumber/`

Typical files:
- `*.png` (screenshot)
- `*.trace.zip` (Playwright trace)

### Open a Playwright trace
    `npx playwright show-trace "playwright/.artifacts/cucumber/.trace.zip"`

Example:
`npx playwright show-trace "playwright/.artifacts/cucumber/Create_a_new_workflow.trace.zip"`

---

## Project Structure

High-level layout:

- `playwright/e2e/features/` — Cucumber feature files (`.feature`)
- `playwright/e2e/stepdefinitions/` — Step definitions (`.ts`)
- `playwright/support/` — Cucumber world + hooks (Playwright lifecycle, artifacts)
- `playwright/src/` — Page Objects / UI abstractions (recommended place for selectors & actions)
- `scripts/` — Utility scripts (e.g., HTML report generation)
- `playwright/.artifacts/` — Generated traces, screenshots, reports

---

## Coding Standards

See [`coding-standards.md`](coding-standards.md).