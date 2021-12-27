import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  catalog: {
    host: process.env.SERVICE_CATALOG_HOST,
    port: process.env.SERVICE_CATALOG_PORT,
    protocol: process.env.SERVICE_CATALOG_PROTOCOL,
    endpoint: process.env.SERVICE_CATALOG_ENDPOINT
  }
};
