import { Page, Locator } from '@playwright/test';

export class ElementsPage {
    readonly page: Page;
    readonly textbox_link: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.textbox_link = page.locator('//span[text()="Text Box"]');
    }

    async clickOnTextboxLink() : Promise<void> {
        await this.textbox_link.click();
    }
}

