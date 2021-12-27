import * as Boom from '@hapi/boom';
import fetch from 'node-fetch-retry';

export default async (request) => {
  const {
    query: { email },
    headers: { token }
  } = request;
  const service = request.container('UserService');
  const baseUri = request.container('Service').getUri('observations');
  const user = await service.findByEmail(email);

  if (!user) throw Boom.notFound(`User: [${email}] not found`);
  if (user.token !== token) throw Boom.unauthorized('User has no access');

  const startDate = new Date(user.startAt).toLocaleDateString('en-CA');
  const startAt = new Date();
  const endDate = startAt.toLocaleDateString('en-CA');

  try {
    const response = await fetch(`${baseUri}?startdate=${startDate}&enddate=${endDate}`, {
      method: 'GET',
      retry: 3,
      pause: 1000,
      callback: (retry) => {
        console.log(`Trying: ${retry}`);
      }
    });
    const result = await response.json();
    if (result.constructor === Error) throw Boom.badRequest(result.message);

    await service.updateStartAt(user, startAt);

    return result;
  } catch (error) {
    console.error('[HANDLER]', error);
    return h
      .response({
        statusCode: 504,
        error: 'Exporter Timeout',
        message: 'There might be a problem. Please, try again.'
      })
      .code(504);
  }
};
