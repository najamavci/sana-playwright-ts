import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    readonly loginPrompt: Locator;
    readonly loginButton: Locator;
    readonly dialogPrompt: Locator;
    readonly closeX: Locator;
    readonly signinButton: Locator;
    readonly acceptCookies: Locator;
    readonly returnToLogin:Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;


    constructor(page: Page) {
        super(page);
        this.loginPrompt = page.locator('[class*="accept-invite-pagestyles__Inner"]');
        this.loginButton=page.getByRole("link", {name:"Log in"})
        this.dialogPrompt = page.getByRole("dialog", {name: "Help us improve"})
        this.closeX = page.locator('[title="Close"]')
        this.signinButton = page.getByRole("link", {name:"Sign in"})
        this.acceptCookies = page.getByRole("checkbox", {name:"Accept cookies"})
        this.returnToLogin=page.getByRole("link", {name:"Return to login"})
        this.emailInput = page.locator("#container-div")
        this.continueButton = page.getByRole("button", { name: /continue|next|sign in/i });

    }

    async sanaLoginUrl() {
        await this.goto("https://sana.ai/79Us8e17keYm/");
    }
    async closeDialog(){
        await this.closeX.click();
    }

    async assertLoaded() {
        await expect(this.loginPrompt).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
    async clickLogin() {
        await expect(this.loginButton).toBeVisible();
        await expect(this.loginButton).toBeEnabled();

        await Promise.all([
            this.page.waitForURL((url) => !url.toString().includes("/accept-invite"), { timeout: 30_000 }),
            this.loginButton.click(),
        ]);
    }

    async assertLoginPrompt() {
        await expect(this.loginPrompt).toHaveText("Log in");
    }

    async dialogPromptAssertion(){
        await expect(this.dialogPrompt).toHaveText("Help us improve");
    }

    async enterEmail() {
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.click();
    }

    async submitEmail() {
        if (await this.continueButton.isVisible().catch(() => false)) {
            await this.continueButton.click();
        }
    }

}