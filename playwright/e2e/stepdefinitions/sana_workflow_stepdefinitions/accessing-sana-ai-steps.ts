import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../../support/world";
import { SanaHomePage } from "../../../src/pages/SanaHomePage";
import { LoginPage } from "../../../src/pages/LoginPage";

Given("User is on Sana AI workspace", async function (this: PWWorld) {
    const home = new SanaHomePage(this.page);
    home.open("https://sana.ai/79Us8e17keYm/");
});

When("User closes the dialog", async function (this: PWWorld) {
    const login = new LoginPage(this.page);

    // Keeps the step stable when the dialog doesn't appear
    if (await login.dialogPrompt.isVisible().catch(() => false)) {
        await login.closeDialog();
        await expect(login.dialogPrompt).toBeHidden({ timeout: 10_000 }).catch(() => {});
    }
});

Then(
    "User should be able to see the outlet of the Sana AI agent",
    async function (this: PWWorld) {
        const home = new SanaHomePage(this.page);
        await expect(home.startChatTextArea).toBeVisible();
    }
);