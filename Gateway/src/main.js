import { http } from './transports';
import { Container, ErrorHandler, Jwt, Queue, Service } from './lib';
import * as config from './config';

const initContainer = () => {
  const container = new Container();

  container.singleton('Config', config);
  container.singleton('Jwt', Jwt, ['Config']);
  container.singleton('Queue', Queue, ['Config']);
  container.singleton('Service', Service, ['Config']);

  return container;
};

const bootstrap = async () => {
  const container = initContainer();
  return { container };
};

// Bootstrap all connections and send it to server using context definition
bootstrap().then(async (ctx) => {
  await Promise.all([http.run(ctx)]);
});

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (err) => {
  ErrorHandler.handleError(err);
  if (!ErrorHandler.isTrustedError(err)) {
    process.exit(1);
  }
});
