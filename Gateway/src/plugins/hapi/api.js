import { analytics, catalog, exporter, sensors } from '../../api/routes';

const plugin = {
  name: 'api',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: (_, h) => {
        return h.response('Hello from Gateway');
      }
    });

    server.route(analytics);
    server.route(catalog);
    server.route(exporter);
    server.route(sensors);
  }
};

export default (server) =>
  server.register(plugin, {
    routes: {
      prefix: '/api'
    }
  });
