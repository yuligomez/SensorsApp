import { run } from './server';
import { database } from './config';
import { Container, ErrorHandler, connect } from './lib';
import { ObservableService, SensorService } from './api/services';
import { ObservableRepository, SensorRepository } from './api/repositories';
import { ObservablePropertyPublisher, SensorPublisher } from './publishers';
import * as config from './config';

const initContainer = () => {
  const container = new Container();

  container.singleton('Config', config);

  container.singleton('SensorPublisher', SensorPublisher, ['Config']);
  container.singleton('SensorService', SensorService, [
    'SensorRepository',
    'ObservableRepository',
    'SensorPublisher'
  ]);
  container.singleton('SensorRepository', SensorRepository);

  container.singleton('ObservablePropertyPublisher', ObservablePropertyPublisher, ['Config']);
  container.singleton('ObservableService', ObservableService, [
    'ObservableRepository',
    'SensorRepository',
    'ObservablePropertyPublisher'
  ]);
  container.singleton('ObservableRepository', ObservableRepository);

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
