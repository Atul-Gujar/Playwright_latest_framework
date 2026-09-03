
import { test, expect } from '@playwright/test';

test('PATCH - Partially update user', async ({ request }) => {

    const requestBody = {
        email: 'newemail@example.com'
    };

    const response = await request.patch(
        'https://jsonplaceholder.typicode.com/users/1',
        {
            data: requestBody
        }
    );

    // Verify status
    expect(response.status()).toBe(200);

    // Get response
    const responseBody = await response.json();

    console.log(responseBody);

    // Validate changed field
    expect(responseBody.email).toBe('newemail@example.com');
});

