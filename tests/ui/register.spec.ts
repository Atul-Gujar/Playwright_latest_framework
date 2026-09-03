import { test, expect } from '@playwright/test';
import { generateUser } from '../../utils/testData';

test('Register new user', async ({ page }) => {

    const user = generateUser();

    await page.goto('https://example.com/register');

    await page.getByLabel('First Name').fill(user.firstName);

    await page.getByLabel('Last Name').fill(user.lastName);

    await page.getByLabel('Email').fill(user.email);

    await page.getByLabel('Password').fill(user.password);

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(
        page.getByText('Registration successful')
    ).toBeVisible();
});