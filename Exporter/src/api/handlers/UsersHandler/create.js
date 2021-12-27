import * as Boom from '@hapi/boom';

export default async (request, h) => {
  const service = request.container('UserService');
  const serviceUri = request.container('Service').getUri('gateway');

  const result = await service.create(request.payload);
  if (!result || result.constructor === Error)
    throw Boom.badRequest(result?.message ?? 'Something went wrong...');

  const resultWithUri = {
    email: result.email,
    token: result.token,
    uri: `${serviceUri}/exports?email=${result.email}`
  };

  return h.response(resultWithUri).code(201);
};
