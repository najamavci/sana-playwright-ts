import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../../support/world";

When('the user is on the workflows page', async function (this: PWWorld) {
    const workflows = this.workflows;
    await workflows.clickWorkflowsHome();
});

When('the user creates a new workflow', async function (this: PWWorld) {
    await this.workflows.createNewWorkflow();
});

Then('the user sets the trigger to {string}', async function (this: PWWorld,trigger:string) {
    await this.workflows.changeTriggerType(trigger);
});

When('the user adds a step {string} with question {string} and instruction {string}', async function (this: PWWorld, trigger: string, instructions:string) {
    await this.workflows.clickScheduleTriggerManually(trigger);
});

Then('the {string} option should be selected', async function (this: PWWorld,workflow:string) {
    await this.workflows.triggerSelected();
});

When('the user fills the new step with {string}', async function (this: PWWorld, step: string) {
    await this.workflows.clickFirstStep();
    await this.workflows.addFirstStep(step);
});

When('user adds an {string} text that asks a question', async function (this: PWWorld, input: string) {
    await this.workflows.clickFirstStep();
});

When('a step {string} that should be defined', async function (this: PWWorld, instruction: string) {
    await this.workflows.addStepInstruction(instruction);

});

When('user adds a next step {string}', async function (this: PWWorld, step: string) {
    const addStepButton = this.page.getByRole("button", { name: /add step|\+.*step/i });
    await expect(addStepButton).toBeVisible();
    await addStepButton.click();

    const stepNameInput = this.page.getByRole("textbox", { name: /step name|name|title/i });
    await expect(stepNameInput).toBeVisible();
    await stepNameInput.fill(step);
});

When('user explains it with an {string}', async function (this: PWWorld, instruction: string) {
    const workflowsAny = this.workflows as unknown as { addStepInstruction?: (text: string) => Promise<void> };
    if (workflowsAny.addStepInstruction) {
        await workflowsAny.addStepInstruction(instruction);
        return;
    }
    const instructionInput = this.page.getByRole("textbox", { name: /instruction|explain|details/i });
    await expect(instructionInput).toBeVisible();
    await instructionInput.fill(instruction);
});

Then('user receive an {string}', async function (this: PWWorld, input: string) {
    await expect(this.page.getByText(input, { exact: false })).toBeVisible();
});

When('user responds with a {string} to the step', async function (this: PWWorld, source: string) {
    const responseInput = this.page.getByRole("textbox", { name: /response|source|answer/i });

    await expect(responseInput).toBeVisible();
    await responseInput.fill(source);
});

When("the user saves the workflow", async function (this: PWWorld) {
    const saveButton = this.page.getByRole("button", { name: /save workflow|save/i });

    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();
    await saveButton.click();
});

Then("the workflow should be visible in the workflows list", async function (this: PWWorld) {
    await this.page.waitForURL(/\/workflows(\b|\/|\?)/i, { timeout: 30_000 });
    const workflowsListRegion = this.page.getByRole("main");
    await expect(workflowsListRegion).toBeVisible();
});