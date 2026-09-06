import dotenv from 'dotenv';

const environment = process.env.ENV || 'qa';

const envFile = `.env.${environment}`;

dotenv.config({
    path: envFile
});

if (!process.env.BASE_URL) {
    throw new Error(
        `BASE_URL is missing in ${envFile}`
    );
}

if (!process.env.API_URL) {
    throw new Error(
        `API_URL is missing in ${envFile}`
    );
}

export const env = {
    name: environment,

    baseURL: process.env.BASE_URL,

    apiURL: process.env.API_URL
};