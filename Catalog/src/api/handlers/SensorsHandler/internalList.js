import * as Boom from '@hapi/boom';

export default async (request) => {
  const {
    container,
    query: { esn }
  } = request;

  const service = container('SensorService');
  const result = await service.findOnePopulated({ esn }, 'observables');

  if (result?.constructor === Error) return Boom.badRequest(result.message);
  if (!result) return Boom.notFound(`Sensor ESN: ${esn} not found`);

  return result;
};
