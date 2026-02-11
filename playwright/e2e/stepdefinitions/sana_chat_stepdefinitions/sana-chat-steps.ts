import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../../support/world";

Given("I am on the SANA chat page", async function (this: PWWorld) {

    await expect(this.page).toHaveURL(/\/chat/);
});
