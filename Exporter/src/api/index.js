import { tasks } from './routes';
import { exports, users } from './routes';

export default {
  name: 'api',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: (_, h) => {
        return h.response('Catalog API');
      }
    });
    server.route(exports);
    server.route(users);
  }
};
