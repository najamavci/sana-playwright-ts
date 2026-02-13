import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.SANA_BASE_URL ?? "https://sana.ai/79Us8e17keYm";
const headless =
    process.env.HEADLESS === undefined ? true : process.env.HEADLESS !== "false";

export default defineConfig({
  testDir: "./playwright/e2e",
  testMatch: /.*\.(spec|test)\.ts/,
  timeout: 60_000,
  expect: { timeout: 15_000 },

  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  outputDir: "playwright/.artifacts/test-results",
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright/.artifacts/html-report" }]
  ],

  use: {
    baseURL,
    headless,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});