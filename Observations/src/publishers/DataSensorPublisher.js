import { Publisher } from '../lib/publisher';

export default class DataSensorPublisher extends Publisher {
  constructor(config) {
    super('data-sensors', config);
  }
}
