import { test, expect } from '@playwright/test';

test('POST - Create user', async ({ request }) => {

    const requestBody = {
        name: 'Atul',
        email: 'atul@example.com',
        username: 'atul123'
    };

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/users',
        {
            data: requestBody
        }
    );

    // Verify status code
    expect(response.status()).toBe(201);

    // Get response body
    const responseBody = await response.json();

    console.log(responseBody);

    // Validate response
    expect(responseBody.name).toBe('Atul');
    expect(responseBody.email).toBe('atul@example.com');
    expect(responseBody.username).toBe('atul123');

    // Verify generated ID
    expect(responseBody.id).toBeTruthy();
});

