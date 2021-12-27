import { emails, dataSets } from './routes';

export default {
  name: 'api',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: (_, h) => {
        return h.response('Analytics API');
      }
    });

    server.route(emails);
    server.route(dataSets);
  }
};
