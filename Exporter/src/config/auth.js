import * as dotenv from 'dotenv';

//Inject al .env parameters to process global module (consider use of ts-dotenv)
dotenv.config();

export default {
  jwt: {
    public: process.env.PUBLIC_KEY
  }
};
