
import { test, expect } from '@playwright/test';

test('PUT - Update complete user', async ({ request }) => {

    const requestBody = {
        id: 1,
        name: 'Atul Updated',
        username: 'atul_updated',
        email: 'atul.updated@example.com'
    };

    const response = await request.put(
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

    // Validate updated data
    expect(responseBody.id).toBe(1);
    expect(responseBody.name).toBe('Atul Updated');
    expect(responseBody.email).toBe('atul.updated@example.com');
});

