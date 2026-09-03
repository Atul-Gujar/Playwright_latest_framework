import { Page, Locator } from '@playwright/test';

export class TextBoxPage {
    readonly page: Page;    
    
    readonly full_name_input: Locator;
    readonly email_input: Locator;
    readonly current_address_input: Locator;
    readonly permanent_address_input: Locator  ;
    readonly submit_button: Locator;
    readonly name_output : Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.full_name_input = page.locator('#userName');
        this.email_input = page.locator('#userEmail');
        this.current_address_input = page.locator('#currentAddress');
        this.permanent_address_input = page.locator('#permanentAddress');
        this.submit_button = page.locator('#submit');
        this.name_output = page.locator('//p[@id="name"]');
    }

    async enterDetails(fullName: string, email: string, currentAddress: string, permanentAddress: string) : Promise<void> {
        await this.full_name_input.fill(fullName);
        await this.email_input.fill(email);
        await this.current_address_input.fill(currentAddress);
        await this.permanent_address_input.fill(permanentAddress);
        await this.submit_button.click();
    }

    async returnOutput() : Promise<string> {

        const nameOutput : String | null = await this.name_output.textContent();
        return  nameOutput?.split(":")[1]?.trim() ?? "";
    }

}