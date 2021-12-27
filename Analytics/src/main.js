import { run } from './server';
import { database } from './config';
import { Cache, connect, Container, ErrorHandler, EmailSender, Service } from './lib';
import { EmailService } from './api/services';
import { EmailRepository } from './api/repositories';
import subscribers from './subscribers';
import * as config from './config';

const initContainer = () => {
  const container = new Container();

  container.singleton('Cache', Cache);
  container.singleton('Config', config);
  container.singleton('EmailSender', EmailSender, ['Config']);
  container.singleton('Service', Service, ['Config']);

  container.singleton('EmailService', EmailService, ['EmailRepository']);
  container.singleton('EmailRepository', EmailRepository);

  return container;
};

const bootstrap = async () => {
  const db = connect(database);
  const container = initContainer();
  container.register('Db', db);

  subscribers.forEach((subscriber) => subscriber(container));

  return { container };
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
