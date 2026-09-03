import { faker } from '@faker-js/faker';

export function generateUser() {

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `user_${Date.now()}_${faker.string.alphanumeric(5)}@example.com`,
        password: 'Test@123'
    };
}