import { Publisher } from '../lib/publisher';

export default class ObservablePropertyPublisher extends Publisher {
  constructor(config) {
    super('observables-data', config);
  }
}
