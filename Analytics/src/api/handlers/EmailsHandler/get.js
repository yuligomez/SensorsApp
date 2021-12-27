import * as Boom from '@hapi/boom';

export default async (request) => {
  const service = request.container('EmailService');
  const result = await service.findById(request.params.id);

  if (result?.constructor === Error) return Boom.badRequest(result.message);
  if (!result) return Boom.notFound(`ID: ${request.params.id} not found`);

  return result;
};
