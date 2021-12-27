import redis from 'redis';

export class Subscriber {
  constructor(channel, { redis: { host, password, port } }) {
    this.config = {
      host,
      password,
      port
    };

    this.channel = channel;
    this.connection = redis.createClient(this.config);

    this.connection.subscribe(this.channel);
  }

  subscribe(onMessage) {
    this.connection.on('message', (_, message) => {
      onMessage(message);
    });
  }
}
