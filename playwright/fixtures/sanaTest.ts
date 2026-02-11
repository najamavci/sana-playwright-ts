import { test as base } from "@playwright/test";
import { SanaHomePage } from "../../pages/SanaHomePage"
import { SanaChatPage } from "../../pages/SanaChatPage";

type SanaFixtures = {
  sanaHome: SanaHomePage;
  sanaChat: SanaChatPage;
};

export const test = base.extend<SanaFixtures>({
  sanaHome: async ({ page }, use) => {
    await use(new SanaHomePage(page));
  },
  sanaChat: async ({ page }, use) => {
    await use(new SanaChatPage(page));
  }
});

export { expect } from "@playwright/test";