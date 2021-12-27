# SensorsApp

SensorsApp system implements a microservices architecture where different quality attributes are favored such as: performance, modifiability, security, availability, interoperability, through the application of design patterns and tactics.

The purpose of the system is to be able to collect and transform information from different sensors located in different parts of the country for the monitoring and analysis of environmental variables by the D.I.N.A.MA.

This project was implemented for academic purposes using Node.js.

The exposed APIs are REST.

## Steps to generate authentication with AUTH0

### Generate keys for JWT

1. Create folder `__certificates__`
2. From `__certificates__` run these two commands
   `'' openssl req -x509 -newkey rsa: 2048 -keyout tempkey.pem -out cert.pem -days 365 openssl rsa -in tempkey.pem -out key.pem` ''
3. Update all `.env` with relative path to` cert.pem`, for example
   `'' ../__certificates__/cert.pem` ''

### Test the App from Postman

1. Make sure all `.env` are up to date (look at the` .env.default`)
2. Enter from a browser the URL from `Gateway` to` / login` for example -> `` `http: // localhost: 8080 / login```
3. That URL will redirect you to AUTH0 authentication, enter using Google
4. Once the login is done, it will show you on the screen the message of `Hello from Gateway` which will indicate that the login was successful
5. Go to the `application` tab of the browser console and copy the value of the generated cookie
6. Add this cookie in Postman where the `key` ->` sid` and the `value` are the value copied in the previous step
7. Once this is done, you can start using Postman to make http request to the app
