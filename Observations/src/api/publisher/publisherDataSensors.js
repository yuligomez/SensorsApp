import Connection from './connection';

export default class PublisherDataSensors {
  constructor() {
    this.channel = 'send-sensors-data';
    this.connection = Connection.connect();
  }

  publish(message) {
    this.connection.publish(this.channel, JSON.stringify(message));
  }
}
