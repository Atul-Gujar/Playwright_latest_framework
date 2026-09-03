import { test, expect } from '@playwright/test';

test('GET - Get user details', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
    );

    // 1. Verify status code
    expect(response.status()).toBe(200);

    // 2. Convert response to JSON
    const responseBody = await response.json();

    // 3. Print response
    console.log(responseBody);

    // 4. Validate response data
    expect(responseBody.id).toBe(1);
    expect(responseBody.name).toBeTruthy();
    expect(responseBody.email).toBeTruthy();
});