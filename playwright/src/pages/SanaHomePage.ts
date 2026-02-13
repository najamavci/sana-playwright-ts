import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SanaHomePage extends BasePage {
  readonly header: Locator;
  readonly startChatTextArea: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('[class*="Naja Mukovic Avci_Test Workspace"]');
    this.startChatTextArea = page.locator('[placeholder*="What would you like to do?"]');
  }

  async open(url:string) {
    await this.goto(url);
  }

  async assertLoaded() {
    await expect(this.header).toBeVisible();
  }

  async startChat() {
    await this.startChatTextArea.click();
  }
}