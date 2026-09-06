import { test, expect } from '../../fixtures/api.fixture';

test('GET - Get user details', async ({ api }) => {

    const response = await api.get('/users/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody.id).toBe(1);
    expect(responseBody.name).toBeTruthy();
    expect(responseBody.email).toBeTruthy();
});