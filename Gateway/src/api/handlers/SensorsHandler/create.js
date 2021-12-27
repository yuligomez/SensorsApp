import * as Boom from '@hapi/boom';

export default async (request, h) => {
  const { container, payload } = request;
  const bull = container('Queue');

  try {
    await bull.add(payload);
    return h.response().code(200);
  } catch (error) {
    console.error('[HANDLER]', error);
    return Boom.gatewayTimeout('There might be a problem. Please, try again.');
  }
};
