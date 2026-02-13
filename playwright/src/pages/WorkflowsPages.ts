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
    readonly triggerSelectedArrow:Locator;
    readonly workflowsHome:Locator;
    readonly stepInstruction:Locator;


    constructor(page: Page) {
        super(page);
        this.workflowsSidebar = page.locator('a[href$="/workflows"]');
        this.createWorkflow=page.getByRole("button", {name:"Create workflow"});
        this.workflowPromptBrowser=page.locator('[class*="relative min-h-full"]');
        this.triggerType=page.getByRole("button", { name: "Change trigger type" });
        this.scheduleTriggerManually=page.getByText("Run manually");
        this.triggerSelectedArrow=page.locator('[class*="flex items-center"]').first();
        this.addWorkflowStep= page.getByText('Like "Search the web to find more information"', { exact: true });
        this.taskName=page.getByRole("textbox", {name:"What do you want to do?"});
        this.saveWorkflow=page.getByRole("button", {name:"Save workflow"});
        this.doneButton=page.getByRole("button", {name:"Done"});
        this.workflowsHome=page.getByText("Workflows");
        this.stepInstruction=page.locator('[class*="relative inline-block max-w-full"]');
    }
    async clickWorkflowsHome(){
         await this.workflowsHome.click();
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

    async changeTriggerType(trigger:string){
     await this.triggerType.click();
    }

    async clickScheduleTriggerManually(trigger:string){
     await this.scheduleTriggerManually.click();
    }

    async triggerSelected(){
        await expect(this.triggerSelectedArrow).toBeVisible();
    }

    async clickFirstStep(){
        await this.addWorkflowStep.click();
    }

    async addFirstStep(text:string){
    await this.addWorkflowStep.fill(text);
    }

    async clickStepInstruction(){
        await this.stepInstruction.click();
    }

    async addStepInstruction(text:string){
        await this.stepInstruction.fill(text);
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