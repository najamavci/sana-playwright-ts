import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import type { PWWorld } from "./world";

const baseURL = process.env.SANA_BASE_URL ?? "https://sana.example.com";

Before(async function (this: PWWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  await this.page.goto(`${baseURL}/chat`);
});

After(async function (this: PWWorld) {
  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
});