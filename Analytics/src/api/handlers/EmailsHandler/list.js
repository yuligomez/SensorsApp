import * as Boom from '@hapi/boom';

export default async (request) => {
  const service = request.container('EmailService');
  const result = service.find({});

  if (result.constructor === Error) return Boom.badRequest(result.message);

  return result;
};
