import {
    test as base,
    APIRequestContext
} from '@playwright/test';

import { env } from '../config/env';

type ApiFixtures = {
    api: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({

    api: async ({ playwright }, use) => {

        const apiContext = await playwright.request.newContext({
            baseURL: env.apiURL
        });

        await use(apiContext);

        await apiContext.dispose();
    }

});

export { expect } from '@playwright/test';