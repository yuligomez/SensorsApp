import { Publisher } from '../lib/publisher';

export default class SensorPropertyPublisher extends Publisher {
  constructor(config) {
    super('sensors', config);
  }
}
