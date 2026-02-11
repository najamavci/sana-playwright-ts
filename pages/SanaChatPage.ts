import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SanaChatPage extends BasePage {
  readonly promptInput: Locator;
  readonly sendButton: Locator;
  readonly assistantMessages: Locator;
  readonly conversationTitle: Locator;

  constructor(page: Page) {
    super(page);
    // Replace these with real selectors from SANA:
    this.promptInput = page.getByTestId("chat-input");
    this.sendButton = page.getByTestId("chat-send");
    this.assistantMessages = page.getByTestId("assistant-message");
    this.conversationTitle = page.getByTestId("conversation-title");
  }

  async open() {
    await this.goto("/chat");
  }

  async assertLoaded() {
    await expect(this.promptInput).toBeVisible();
    await expect(this.sendButton).toBeVisible();
  }

  async sendPrompt(prompt: string) {
    await this.promptInput.fill(prompt);
    await this.sendButton.click();
  }

  async waitForAssistantResponseContaining(text: string) {
    // Wait for at least one assistant message, then check it contains expected text.
    await expect(this.assistantMessages.first()).toBeVisible();
    await expect(this.assistantMessages).toContainText(text);
  }

  async expectAtLeastOneAssistantMessage() {
    await expect(this.assistantMessages.first()).toBeVisible();
  }
}