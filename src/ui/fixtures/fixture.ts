import { test as base } from '@playwright/test';
import { GistHomePage } from '../pages/gistHomePage.js';

type MyFixtures = {
  gistHomePage: GistHomePage;
};

export const test = base.extend<MyFixtures>({
  gistHomePage: async ({ page }, use) => {
    await use(new GistHomePage(page));
  },
});

export { expect } from '@playwright/test';
