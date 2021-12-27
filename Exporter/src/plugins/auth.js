import { readFileSync } from 'fs';
import JWT2 from 'hapi-auth-jwt2';
import { auth } from '../config';

const validate = async function (decoded, request, h) {
  const { username } = decoded;
  return {
    isValid: username !== null,
    credentials: {
      username
    }
  };
};

const plugin = {
  name: 'auth0',
  version: '1.0.0',
  register: async function (server) {
    const publicKey = readFileSync(auth.jwt.public);
    await server.register(JWT2);
    server.auth.strategy('jwt', 'jwt', {
      key: publicKey,
      validate,
      verifyOptions: {
        expiresIn: 36000,
        algorithms: ['RS256'] // specify your secure algorithm
      }
    });
  }
};

export default (server) => server.register(plugin);
