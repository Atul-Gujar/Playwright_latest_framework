import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/auth.json';

setup('authenticate', async ({ page }) => {

    // Open login page
    await page.goto('https://example.com/login');

    // Enter username
    await page.getByLabel('Username').fill('standard_user');

    // Enter password
    await page.getByLabel('Password').fill('secret123');

    // Click login
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful login
    await expect(page).toHaveURL(/dashboard/);

    // Save authentication state
    await page.context().storageState({
        path: authFile
    });
});