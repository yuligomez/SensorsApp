import { run } from './server';
import { database } from './config';
import { Cache, connect, Container, ErrorHandler, Queue, Service } from './lib';
import { DataSensorService } from './api/services';
import { DataSensorRepository } from './api/repositories';
import { DataSensorModel } from './api/models';
import { DataSensorPublisher } from './publishers';
import consumers from './consumers';
import subscribers from './subscribers';

import * as config from './config';

const initContainer = () => {
  const container = new Container();

  container.singleton('Cache', Cache);
  container.singleton('Config', config);
  container.singleton('Queue', Queue, ['Config']);
  container.singleton('Service', Service, ['Config']);

  container.singleton('DataSensorPublisher', DataSensorPublisher, ['Config']);
  container.singleton('DataSensorService', DataSensorService, [
    'DataSensorRepository',
    'DataSensorPublisher'
  ]);
  container.singleton('DataSensorRepository', DataSensorRepository, ['DataSensorModel']);
  container.singleton('DataSensorModel', DataSensorModel, ['Db']);

  return container;
};

const bootstrap = async () => {
  const db = connect(database);
  const container = initContainer();
  container.register('Db', db);

  consumers.forEach((consumer) => consumer(container));
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
