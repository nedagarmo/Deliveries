import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const API_URL_MELONN = process.env.API_URL_MELONN || 'https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox';
const API_KEY_MELONN = process.env.API_KEY_MELONN || '8hu71URNzm7FCLV9LfDPd9Gz61zN2diV6kG2hDEw';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const MELONN_INTEGRATION = {
    url: API_URL_MELONN,
    key: API_KEY_MELONN
};

const config = {
    server: SERVER,
    melonn: MELONN_INTEGRATION
};

export default config;
