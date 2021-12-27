import Bull from 'bull';

export class Queue {
  constructor({ redis: { name, host, password, port } }) {
    this.name = name;
    this.config = {
      redis: {
        host,
        password,
        port
      }
    };
    this.queue = new Bull(this.name, this.config);
  }

  async process(handler) {
    this.queue.process(5, handler);
  }
}
