import Connection from './connection';

export default class SucriberSensors {
  constructor() {
    this.channel = 'send-method-and-sensor-esn';
    this.connection = Connection.connect();
    this.connection.subscribe(this.channel);
  }
  subscribe(onMessage) {
    this.connection.on('message', (channel, message) => {
      onMessage(message);
    });
  }
}
