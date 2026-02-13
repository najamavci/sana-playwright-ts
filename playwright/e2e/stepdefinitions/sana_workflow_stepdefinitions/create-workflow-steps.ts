import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../../support/world";

When('the user is on the workflows page', async function (this: PWWorld) {
    this.page.goto("https://sana.ai/79Us8e17keYm/workflows");
    await this.workflows.assertLoaded();

});

When('the user creates a new workflow', async function (this: PWWorld) {
    await this.workflows.clickOnCreateWorkflow();
});

Then('the user sets the trigger to {string}', async function (this: PWWorld,trigger:string) {
    await this.workflows.changeTriggerType(trigger);
    await this.workflows.clickScheduleTriggerManually(trigger);
});

When(
    "the user adds a step {string} with note {string}",
    async function (this: PWWorld, stepName: string, question: string) {
        const worldAny = this as unknown as { _stepRound?: number };
        const round = worldAny._stepRound ?? 0;

        if (round === 0) {
            await this.workflows.clickFirstStep();
            await this.workflows.addFirstStep(stepName);
        } else {
            await this.workflows.addSecondtStep(stepName);
        }

        const stepInfo = this.page.locator("#portal-root ul li [class*='grid']").nth(round).locator("div.text-base div div");

        await expect(stepInfo).toBeVisible();
        await stepInfo.click();
        await stepInfo.fill(question);

        // Scroll a little AFTER filling the 2nd step (round 1)
        if (round === 1) {
            await this.page.keyboard.press("Tab");

        }
        // Only after finishing step 1, create step 2 fields
        if (round === 0) {
            await this.page.keyboard.press("Enter");

            // Wait until the second step row exists before the next round
            await expect(this.page.locator("#portal-root ul li [class*='grid']").nth(1)
            ).toBeVisible();
        }

        worldAny._stepRound = round + 1;
    }
);

When("the user saves the workflow", { timeout: 30_000 }, async function (this: PWWorld) {
        await this.workflows.clickSaveWorkflow();
    }
);

When('user clicks on Done button', { timeout: 30_000 },
    async function () {
    await this.workflows.clickDone();
});

Then('the user should be redirected to the home page now', async function () {
    await expect(this.page).toHaveURL("https://sana.ai/79Us8e17keYm/workflows");
});

