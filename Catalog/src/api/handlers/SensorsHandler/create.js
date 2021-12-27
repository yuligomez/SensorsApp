import * as Boom from '@hapi/boom';

export default async (request, h) => {
  const service = request.container('SensorService');
  const result = await service.create(request.payload);

  if (!result || result.constructor === Error)
    return Boom.badRequest(result?.message ?? 'Something went wrong...');

  return h.response(result).code(201);
};
