import Connection from './connection';

export default class SubscriberDataSensors {
  constructor() {
    this.channel = 'send-sensors-data';
    this.connection = Connection.connect();
    this.connection.subscribe(this.channel);
  }
  subscribe(onMessage) {
    this.connection.on('message', (channel, message) => {
      onMessage(message);
    });
  }
}
