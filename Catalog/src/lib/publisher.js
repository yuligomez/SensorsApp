import redis from 'redis';

export class Publisher {
  constructor(channel, { redis: { host, password, port } }) {
    this.config = {
      host,
      password,
      port
    };

    this.channel = channel;
    this.connection = redis.createClient(this.config);
  }

  publish(type, data) {
    const message = {
      type,
      data
    };

    this.connection.publish(this.channel, JSON.stringify(message));
  }
}
