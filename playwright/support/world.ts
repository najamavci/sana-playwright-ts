import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "@playwright/test";
import { WorkflowsPage } from "../src/pages/WorkflowsPages";

export class PWWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  private _workflows?: WorkflowsPage;

  get workflows(): WorkflowsPage {
    // Created once per scenario, reused across step definitions
    if (!this._workflows) this._workflows = new WorkflowsPage(this.page);
    return this._workflows;
  }
}

setWorldConstructor(PWWorld);