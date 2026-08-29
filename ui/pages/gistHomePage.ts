import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage.js';

export class GistHomePage extends BasePage {
  readonly elements = {
    gistHeading: (headingName: string): Locator =>
      this.page.getByRole('heading', {
        name: `${headingName}`,
      }),
    gistFileName: (fileName: string): Locator => this.page.locator(fileName),
  };

  constructor(page: Page) {
    super(page);
  }

  async visitGistHomePage() {
    await this.goto('/');
  }

  async visitCreatedPublicGist(url: string) {
    await this.goto(url);
  }

  async verifyGistHeading(headingName: string) {
    await this.verifyElementVisible(this.elements.gistHeading(headingName));
  }

  async verifyGistFileName(fileName: string) {
    await this.verifyElementVisible(this.elements.gistFileName(fileName));
  }
}
