import * as Boom from '@hapi/boom';

export default async (request, h) => {
  const service = request.container('ObservableService');
  const {
    params: { id },
    payload
  } = request;

  const result = await service.updateOneById(id, payload);

  if (result?.constructor === Error) throw Boom.badRequest(result.message);
  if (!result) throw Boom.notFound(`ID: ${request.params.id} not found`);

  return h.response().code(204);
};
