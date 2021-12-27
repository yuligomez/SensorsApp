import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  analytics: {
    host: process.env.SERVICE_ANALYTICS_HOST,
    port: process.env.SERVICE_ANALYTICS_PORT,
    protocol: process.env.SERVICE_ANALYTICS_PROTOCOL
  },
  catalog: {
    host: process.env.SERVICE_CATALOG_HOST,
    port: process.env.SERVICE_CATALOG_PORT,
    protocol: process.env.SERVICE_CATALOG_PROTOCOL
  },
  exporter: {
    host: process.env.SERVICE_EXPORTER_HOST,
    port: process.env.SERVICE_EXPORTER_PORT,
    protocol: process.env.SERVICE_EXPORTER_PROTOCOL
  }
};
