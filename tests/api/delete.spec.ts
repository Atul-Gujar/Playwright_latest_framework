
import { test, expect } from '@playwright/test';

test('DELETE - Delete user', async ({ request }) => {

    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/users/1'
    );

    // Verify status
    expect(response.status()).toBe(200);

    console.log('User deleted successfully');
});

