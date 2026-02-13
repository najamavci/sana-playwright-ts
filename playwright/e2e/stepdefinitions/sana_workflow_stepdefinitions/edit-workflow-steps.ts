import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../../support/world";
import crypto from "node:crypto";

function uniqueId() {
    return crypto.randomBytes(4).toString("hex");
}

function resolveUnique(world: PWWorld, template: string) {
    const anyWorld = world as unknown as { __unique?: string };
    if (!anyWorld.__unique) anyWorld.__unique = uniqueId();
    return template.replace(/<unique>/g, anyWorld.__unique);
}

async function ensureWorkflowExists(world: PWWorld, name: string) {
    const existing = world.page.getByText(name, { exact: true });
    if (await existing.isVisible().catch(() => false)) return;

    await world.workflows.createNewWorkflow();
    await world.workflows.addWorkflowTaskName(name);

    await world.workflows.clickSaveWorkflow();
    await world.workflows.clickDone().catch(() => {});

    await world.page.waitForURL(/\/workflows(\b|\/|\?)/i, { timeout: 30_000 }).catch(() => {});
    await expect(world.page.getByText(name, { exact: true })).toBeVisible();
}

Given('a workflow named {string} exists', async function (this: PWWorld, nameTemplate: string) {
    const name = resolveUnique(this, nameTemplate);

    await this.page.waitForURL(/\/workflows(\b|\/|\?)/i, { timeout: 30_000 }).catch(() => {});
    await ensureWorkflowExists(this, name);
});

When(
    'I rename the workflow {string} to {string}',
    async function (this: PWWorld, fromTemplate: string, toTemplate: string) {
        const from = resolveUnique(this, fromTemplate);
        const to = resolveUnique(this, toTemplate);

        // 1) Open the workflow from the list
        await this.page.getByText(from, { exact: true }).click();

        const nameInputByRole = this.page.getByRole("textbox", { name: /workflow name|name/i });
        if (await nameInputByRole.isVisible().catch(() => false)) {
            await nameInputByRole.fill(to);
        } else {
            const anyNameInput = this.page
                .locator("input[type='text'], textarea")
                .filter({ hasText: from })
                .first();

            if (await anyNameInput.isVisible().catch(() => false)) {
                await anyNameInput.fill(to);
            } else {
                const title = this.page.getByText(from, { exact: true }).first();
                await expect(title).toBeVisible();
                await title.click();
                await this.page.keyboard.press("Control+A");
                await this.page.keyboard.type(to);
            }
        }
        await this.workflows.clickSaveWorkflow();
        await this.workflows.clickDone().catch(() => {});

        await this.page.waitForURL(/\/workflows(\b|\/|\?)/i, { timeout: 30_000 }).catch(() => {});
    }
);

Then(
    'I should see the workflow {string} in the workflows list',
    async function (this: PWWorld, nameTemplate: string) {
        const name = resolveUnique(this, nameTemplate);

        await this.page.waitForURL(/\/workflows(\b|\/|\?)/i, { timeout: 30_000 }).catch(() => {});
        await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    }
);