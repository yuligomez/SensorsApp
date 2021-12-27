import Connection from './connection';

export default class SubscriberObservableProperties {
  constructor() {
    this.channel = 'send-observable-properties-info';
    this.connection = Connection.connect();

    this.connection.subscribe(this.channel);
  }

  subscribe(onMessage) {
    this.connection.on('message', (channel, message) => {
      onMessage(message);
    });
  }
}
