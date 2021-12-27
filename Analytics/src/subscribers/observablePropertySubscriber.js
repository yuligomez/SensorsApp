import { Subscriber } from '../lib';

export default (container) => {
  const subscriber = new Subscriber('observables-data', container.get('Config'));
  const cache = container.get('Cache');

  subscriber.subscribe((message) => {
    const {
      type = '',
      data: { oldName = '', name = '', range = {} }
    } = JSON.parse(message) || {};

    switch (type) {
      case 'add':
        cache.add(name, range);
        break;

      case 'delete':
        cache.delete(name);
        break;

      case 'update':
        cache.update(name, oldName, range);
        break;

      default:
        break;
    }
  });
};
