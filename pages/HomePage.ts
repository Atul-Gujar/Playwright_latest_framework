import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly elements_link: Locator;

    constructor(page: Page) {
        this.page = page;
        this.elements_link = page.locator('//h5[text()="Elements"]');
    }

    async goto() : Promise<void> {
        await this.page.goto('/');
    }

    async clickOnElementsLink() : Promise<void> {
        await this.elements_link.click();
    }

}