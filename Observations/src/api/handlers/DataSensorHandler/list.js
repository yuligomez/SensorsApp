import * as Boom from '@hapi/boom';

export default async (request) => {
  const service = request.container('DataSensorService');
  const result = await service.find(request);

  if (result.constructor === Error) return Boom.badRequest(result.message);
  
  return result;
};
