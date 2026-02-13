import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class WorkflowsPage extends BasePage {
    readonly workflowsSidebar: Locator;
    readonly createNewWorkflow: Locator;
    readonly workflowPromptBrowser:Locator;
    readonly triggerType:Locator;
    readonly scheduleTriggerManually:Locator;
    readonly addWorkflowStep:Locator;
    readonly taskName:Locator;
    readonly saveWorkflow:Locator;
    readonly doneButton:Locator;
    readonly triggerSelectedArrow:Locator;
    readonly workflowsHome:Locator;
    readonly stepTask:Locator;
    readonly stepNameInput: Locator;
    readonly stepInformation: Locator;
    readonly plusButton: Locator;
    readonly workflowName:Locator;
    readonly secondstepNameInput:Locator;
    readonly space:Locator;
    readonly workflowNamePrompt:Locator;



    constructor(page: Page) {
        super(page);
        this.workflowsSidebar = page.locator('a[href$="/workflows"]');
        this.createNewWorkflow=page.getByRole("button", {name:"Create workflow"});
        this.workflowPromptBrowser=page.locator('[class*="relative min-h-full"]');
        this.triggerType=page.getByRole("button", { name: "Change trigger type" });
        this.scheduleTriggerManually=page.getByText("Run manually");
        this.triggerSelectedArrow=page.locator('[class*="flex items-center"]').first();
        this.addWorkflowStep = page.getByRole("button", { name: "Add step" });
        this.stepNameInput = page.locator("#portal-root").getByRole("textbox").first();
        this.taskName=page.getByRole("textbox", {name:"What do you want to do?"});
        this.saveWorkflow=page.locator("#portal-root").getByRole("button", { name: "Save workflow" })
        this.doneButton=page.getByRole("button", {name:"Done"});
        this.workflowsHome=page.getByText("Workflows");
        this.stepTask=page.locator('[value*="New step"]');
        this.stepInformation=page.locator("#portal-root ul li [class*='grid']").first().locator("div.text-base div div");
        this.plusButton=page.locator("#portal-root button").first();
        this.workflowName = page.locator("#portal-root").getByRole("heading", {level: 1, name: "Start work greeting",})
        this.secondstepNameInput = page.locator("#portal-root").getByRole("textbox").last();
        this.space=page.locator('[class*="relative group"]').first();
        this.workflowNamePrompt=page.locator('[placeholder*="Enter workflow name"]').first();



    }

    async assertLoaded() {
        await expect(this.workflowsSidebar).toBeVisible();
    }

    async clickOnCreateWorkflow(){
        await this.createNewWorkflow.click();
    }

    async changeTriggerType(trigger:string){
        await this.triggerType.click();
    }

    async clickScheduleTriggerManually(trigger:string){
        await this.scheduleTriggerManually.click();
    }

    async clickFirstStep() {
        await expect(this.addWorkflowStep).toBeVisible();
        await this.addWorkflowStep.click();
    }
    async addSecondtStep(text:string) {
        await expect(this.secondstepNameInput).toBeVisible();
        await this.stepTask.fill(text);
    }

    async addFirstStep(text: string) {
        await expect(this.stepNameInput).toBeVisible();
        await this.stepTask.fill(text);
    }

    async clickStepInformation(){
        await expect(this.stepInformation).toBeVisible();
        await this.stepInformation.click();
    }
    async fillStepInformation(text:string){
        await expect(this.stepInformation).toBeVisible();
        await this.stepInformation.fill(text)
    }

    async addWorkflowTaskName(text:string){
        await this.taskName.fill(text);
    }
    async clickSaveWorkflow(){
        await expect(this.saveWorkflow).toBeVisible();
        await expect(this.saveWorkflow).toBeEnabled();

        await this.saveWorkflow.click();
        await this.page.waitForTimeout(15000);

        // Wait until saving completes (UI is ready to proceed)
        await expect(this.doneButton).toBeVisible({ timeout: 30_000 });
        await expect(this.doneButton).toBeEnabled({ timeout: 30_000 });
    }

    async clickDone(){
        await expect(this.doneButton).toBeVisible();
        await this.doneButton.click();
    }
    async assertWorkflowPage(){
        await expect(this.page.locator('h1')).toHaveText("Workflows");
    }
}