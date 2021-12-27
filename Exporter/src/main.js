import { run } from './server';
import { database } from './config';
import { Container, ErrorHandler, connect, Service } from './lib';
import { UserService } from './api/services';
import { UserRepository } from './api/repositories';
import * as config from './config';

const initContainer = () => {
  const container = new Container();

  container.singleton('Config', config);
  container.singleton('Service', Service, ['Config']);

  container.singleton('UserService', UserService, ['UserRepository']);
  container.singleton('UserRepository', UserRepository);

  return container;
};

const bootstrap = async () => {
  const db = connect(database);
  const container = initContainer();
  container.register('Db', db);

  return {
    container
  };
};

// Bootstrap all connections and send it to server using context definition
bootstrap().then(run);

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
