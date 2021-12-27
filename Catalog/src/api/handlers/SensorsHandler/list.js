import * as Boom from '@hapi/boom';

export default async (request) => {
  const service = request.container('SensorService');
  const result = service.findPopulated({}, 'observables');

  if (result?.constructor === Error) throw Boom.badRequest(result.message);
  if (!result) throw Boom.notFound(`Sensor ESN: ${esn} not found`);

  return result;
};
