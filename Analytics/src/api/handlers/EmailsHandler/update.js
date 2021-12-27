import * as Boom from '@hapi/boom';

export default async (request, h) => {
  const service = request.container('EmailService');
  const {
    params: { id },
    payload
  } = request;

  const result = await service.updateOneById(id, payload);

  if (result?.constructor === Error) return Boom.badRequest(result.message);
  if (!result) return Boom.notFound(`ID: ${request.params.id} not found`);

  return h.response().code(204);
};
