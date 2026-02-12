import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AlertPage extends BasePage {
    readonly loginPrompt: Locator;
    readonly loginButton: Locator;
    readonly dialogPrompt: Locator;
    readonly closeX: Locator;


    constructor(page: Page) {
        super(page);
        this.loginPrompt = page.locator('[class*="accept-invite-pagestyles__Inner"]');
        this.loginButton = page.getByText("Log in");
        this.dialogPrompt = page.getByRole("dialog", {name: "Help us improve"})
        this.closeX = page.locator('[title="Close"]')

    }

    async sanaLoginUrl() {
        await this.goto("https://sana.ai/accept-invite?code=Mic6GmSgKMNWqibp");
    }

    async assertLoaded() {
        await expect(this.loginPrompt).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async clickLogin() {
        await this.loginButton.click();
    }
    async assertLoginPrompt() {
        await expect(this.loginPrompt).toHaveText("Log in");
    }
    async dialogPromptAssertion(){
        await expect(this.dialogPrompt).toHaveText("Help us improve");
    }
    async closeDialog(){
        await this.closeX.click();
    }
/*
    async waitForAssistantResponseContaining(text: string) {
        await expect(this.assistantMessages.first()).toBeVisible();
        await expect(this.assistantMessages).toContainText(text);
    }

    async expectAtLeastOneAssistantMessage() {
        await expect(this.assistantMessages.first()).toBeVisible();
    }

 */
}