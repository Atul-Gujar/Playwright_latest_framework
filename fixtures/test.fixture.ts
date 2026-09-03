import {
    test as base,
    expect
} from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { ElementsPage } from '../pages/ElementsPage';
import { TextBoxPage } from '../pages/TextBoxPage';

type Fixtures = {
    homePage: HomePage;
    elementsPage: ElementsPage;
    textBoxPage: TextBoxPage;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    elementsPage: async ({ page }, use) => {
        await use(new ElementsPage(page));
    },
    textBoxPage: async ({ page }, use) => {
        await use(new TextBoxPage(page));
    }
});

export { expect };