import { test as base } from "@playwright/test";
import { SanaHomePage } from "../src/pages/SanaHomePage"

type SanaFixtures = {
  sanaHome: SanaHomePage;
};

export const test = base.extend<SanaFixtures>({
  sanaHome: async ({ page }, use) => {
    await use(new SanaHomePage(page));
  },
});

export { expect } from "@playwright/test";