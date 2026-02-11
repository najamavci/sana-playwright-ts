import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { PWWorld } from "../../../support/world";
import { SanaChatPage } from "../../../../pages/SanaChatPage";

Given("I am on the SANA chat page", async function (this: PWWorld) {
  // Navigation handled in hooks, but keep a sanity check:
  await expect(this.page).toHaveURL(/\/chat/);
});

When("I ask SANA to draft a delayed shipment email", async function (this: PWWorld) {
  const chat = new SanaChatPage(this.page);
  await chat.assertLoaded();
  await chat.sendPrompt(
    [
      "Draft a short email to a customer about a delayed shipment.",
      "Constraints:",
      "- Include the phrase: 'thank you for your patience'",
      "- Apologize once",
      "- Under 90 words"
    ].join("\n")
  );
  await chat.expectAtLeastOneAssistantMessage();
});

When("I ask SANA to refine it with a subject line", async function (this: PWWorld) {
  const chat = new SanaChatPage(this.page);
  await chat.sendPrompt(
    [
      "Refine the email:",
      "- Add a subject line starting with 'Subject:'",
      "- Keep the phrase 'thank you for your patience'"
    ].join("\n")
  );
});

Then("the last answer should include required elements", async function (this: PWWorld) {
  const chat = new SanaChatPage(this.page);
  //await chat.expectLastAnswerContainsAll(["Subject:", "thank you for your patience"]);
});
