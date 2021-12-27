import { Subscriber } from '../lib';

export default (container) => {
  const subscriber = new Subscriber('observables-data', container.get('Config'));
  const cache = container.get('Cache');

  subscriber.subscribe((message) => {
    const {
      type = '',
      data: { oldName = '', name = '', sensors = [] }
    } = JSON.parse(message) || {};

    switch (type) {
      case 'add':
        cache.addValues(name, sensors);
        break;

      case 'delete':
        cache.deleteValue(name);
        break;

      case 'update':
        cache.updateValues(name, oldName, sensors);
        break;

      default:
        break;
    }
  });
};
