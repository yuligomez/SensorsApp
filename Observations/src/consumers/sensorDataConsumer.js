import fetch from 'node-fetch-retry';

export default (container) => {
  const bull = container.get('Queue');
  const cache = container.get('Cache');
  const httpService = container.get('Service');
  const dataSensorService = container.get('DataSensorService');

  bull.process(async ({ data }) => {
    try {
      const { esn, observableProperty } = data;

      if (!cache.has(esn)) {
        const catalogUri = httpService.getUri('catalog');
        const response = await fetch(`${catalogUri}?esn=${esn}`, {
          method: 'GET',
          retry: 3,
          pause: 1000,
          callback: (retry) => {
            console.log(`Trying: ${retry}`);
          }
        });

        if (!response) throw new Error(`Sensor ESN: [${esn}] does not exist on the system`);
        if (response.status !== 200) throw new Error('Something went wrong, please try again');

        const { esn: newEsn, observables } = await response.json();

        cache.add(
          newEsn,
          observables.map((observable) => observable.name)
        );
      }

      if (cache.get(esn).has(observableProperty)) {
        return await dataSensorService.create(data);
      }

      throw new Error(
        `Observable Property: [${observableProperty}] does not exist for Sensor ESN: [${esn}]`
      );
    } catch (error) {
      console.error(error);
    }
  });
};
