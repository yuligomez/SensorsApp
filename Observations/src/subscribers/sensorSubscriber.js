import { Subscriber } from '../lib';

export default (container) => {
  const subscriber = new Subscriber('sensors', container.get('Config'));
  const cache = container.get('Cache');

  subscriber.subscribe((message) => {
    const {
      type = '',
      data: { oldEsn = '', esn = '', observables = [] }
    } = JSON.parse(message) || {};

    switch (type) {
      case 'add':
        cache.add(esn, observables);
        break;

      case 'delete':
        cache.delete(esn);
        break;

      case 'update':
        cache.update(esn, oldEsn, observables);
        break;

      default:
        break;
    }
  });
};
