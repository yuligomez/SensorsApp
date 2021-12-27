import redis from 'redis';

export default class Connection {
  static connect() {
    return redis.createClient();
  }
}
