import * as Boom from '@hapi/boom';

export default async (request) => {
  const service = request.container('ObservableService');
  const result = await service.findByIdPopulated(request.params.id, 'sensors');

  if (result?.constructor === Error) throw Boom.badRequest(result.message);
  if (!result) throw Boom.notFound(`ID: ${request.params.id} not found`);

  return result;
};
