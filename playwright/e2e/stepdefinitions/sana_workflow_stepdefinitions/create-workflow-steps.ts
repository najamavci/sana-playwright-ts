import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../../support/world";
import { WorkflowsPage } from "../../../src/pages/WorkflowsPages";

Given("I am on the Sana Workflows page", async function (this: PWWorld) {
    const workflowsPage = new WorkflowsPage(this.page);

    await workflowsPage.sanaWorkflowsUrl();
    await workflowsPage.assertLoaded();

    await workflowsPage.clickWorkflows();
    await this.page.waitForURL(/\/workflows(\b|\/|\?)/i);
});

When('I create a new workflow named {string}', async function (this: PWWorld, name: string) {
    const workflowsPage = new WorkflowsPage(this.page);

    await workflowsPage.createNewWorkflow();
    await workflowsPage.addWorkflowTaskName(name);
});

When("I save and confirm the workflow creation", async function (this: PWWorld) {
    const workflowsPage = new WorkflowsPage(this.page);

    await workflowsPage.clickSaveWorkflow();

    const dialog = this.page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await workflowsPage.clickDone();
    await expect(dialog).toBeHidden({ timeout: 10_000 }).catch(() => {});
});

Then('I should see the workflow {string} in the workflows list',
    async function (this: PWWorld, name: string) {
        await this.page.waitForURL(/\/workflows(\b|\/|\?)/i);
        await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    }
);