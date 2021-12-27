import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  observations: {
    host: process.env.SERVICE_OBSERVATIONS_HOST,
    port: process.env.SERVICE_OBSERVATIONS_PORT,
    protocol: process.env.SERVICE_OBSERVATIONS_PROTOCOL,
    endpoint: process.env.SERVICE_OBSERVATIONS_ENDPOINT
  },
  gateway: {
    host: process.env.SERVICE_GATEWAY_HOST,
    port: process.env.SERVICE_GATEWAY_PORT,
    protocol: process.env.SERVICE_GATEWAY_PROTOCOL,
    endpoint: process.env.SERVICE_GATEWAY_ENDPOINT
  }
};
