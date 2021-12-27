import * as dotenv from 'dotenv';

dotenv.config();

const cookieKey = process.env.COOKIE_KEY;
const cookieValue = process.env.COOKIE_VALUE;

const getRequestObj = (
  method = 'GET',
  payload = {},
  headers = { 'Content-Type': 'application/json', cookie: `${cookieKey}=${cookieValue};` }
) => {
  let obj = {
    method,
    headers,
    retry: 3,
    pause: 1000,
    callback: (retry) => {
      console.log(`Trying: ${retry}`);
    }
  };

  if (method === 'POST') obj = { ...obj, body: JSON.stringify(payload) };

  return obj;
};

export default getRequestObj;
