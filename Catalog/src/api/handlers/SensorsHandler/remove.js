import * as Boom from '@hapi/boom';

export default async (request, h) => {
  const service = request.container('SensorService');
  const result = await service.deleteOneById(request.params.id);

  if (result?.constructor === Error) throw Boom.badRequest(result.message);
  if (!result) throw Boom.notFound(`ID: ${request.params.id} not found`);

  return h.response().code(204);
};
