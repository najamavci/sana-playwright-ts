import { Before, After, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import type { PWWorld } from "./world";
import fs from "node:fs";
import path from "node:path";

const baseURL = process.env.SANA_BASE_URL ?? "https://sana.ai/79Us8e17keYm";
const headless = process.env.HEADLESS === undefined ? true : process.env.HEADLESS !== "false";
const authStatePath = path.resolve("playwright", ".auth", "state.json");

function toFileSafe(name: string) {
  return name
      .replace(/[^\w.-]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 180);
}

Before(async function (this: PWWorld, scenario) {
  const artifactsDir = path.resolve("playwright", ".artifacts", "cucumber");
  fs.mkdirSync(artifactsDir, { recursive: true });

  this.browser = await chromium.launch({ headless });

  this.context = await this.browser.newContext({
    storageState: fs.existsSync(authStatePath) ? authStatePath : undefined,
  });

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  this.page = await this.context.newPage();

  // Start directly where you need to be
  await this.page.goto(`${baseURL}/workflows`);
});

After(async function (this: PWWorld, scenario) {
  const artifactsDir = path.resolve("playwright", ".artifacts", "cucumber");
  const name = toFileSafe(scenario.pickle.name);

  const failed = scenario.result?.status === Status.FAILED;

  if (failed && this.page) {
    const screenshotPath = path.join(artifactsDir, `${name}.png`);
    const tracePath = path.join(artifactsDir, `${name}.trace.zip`);

    await this.page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
    await this.context?.tracing.stop({ path: tracePath }).catch(() => {});

    const screenshot = fs.readFileSync(screenshotPath);
    await this.attach(screenshot, "image/png");
  } else {
    await this.context?.tracing.stop().catch(() => {});
  }

  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
});