import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class WorkflowsPage extends BasePage {
    readonly workflowsSidebar: Locator;
    readonly createWorkflow: Locator;
    readonly workflowPromptBrowser:Locator;
    readonly triggerType:Locator;
    readonly scheduleTriggerManually:Locator;
    readonly addWorkflowStep:Locator;
    readonly taskName:Locator;
    readonly saveWorkflow:Locator;
    readonly doneButton:Locator;


    constructor(page: Page) {
        super(page);
        this.workflowsSidebar = page.locator('a[href$="/workflows"]');
        this.createWorkflow=page.getByText("Create a new workflow");
        this.workflowPromptBrowser=page.locator('[class*="relative min-h-full"]');
        this.triggerType=page.getByRole("button", { name: "Change trigger type" });
        this.scheduleTriggerManually=page.getByText("Run manually");
        this.addWorkflowStep=page.getByRole("button", { name: "Add step" });
        this.taskName=page.getByRole("textbox", {name:"What do you want to do?"});
        this.saveWorkflow=page.getByRole("button", {name:"Save workflow"});
        this.doneButton=page.getByRole("button", {name:"Done"});
    }

    async sanaWorkflowsUrl() {
        await this.goto("https://sana.ai/accept-invite?code=Mic6GmSgKMNWqibp");
    }

    async assertLoaded() {
        await expect(this.workflowsSidebar).toBeVisible();
    }

    async clickWorkflows() {
        await this.workflowsSidebar.click();
    }

    async createNewWorkflow(){
     await this.createWorkflow.click();
    }

    async changeTriggerType(){
     await this.triggerType.click();
    }

    async clickScheduleTriggerManually(){
     await this.scheduleTriggerManually.click();
    }

    async addFirstStep(text:string){
    await this.addWorkflowStep.fill(text);
    }

    async addWorkflowTaskName(text:string){
    await this.taskName.fill(text);
    }

    async clickSaveWorkflow(){
    await this.saveWorkflow.click();
    }

    async clickDone(){
    await this.doneButton.click();
    }
}