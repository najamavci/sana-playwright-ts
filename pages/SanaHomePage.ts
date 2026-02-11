import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SanaHomePage extends BasePage {
  readonly header: Locator;
  readonly startChatButton: Locator;

  constructor(page: Page) {
    super(page);
    // Replace these with real selectors from SANA:
    this.header = page.getByTestId("sana-header");
    this.startChatButton = page.getByTestId("start-chat");
  }

  async open() {
    await this.goto("/");
  }

  async assertLoaded() {
    await expect(this.header).toBeVisible();
  }

  async startChat() {
    await this.startChatButton.click();
  }
}