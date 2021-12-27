import * as Boom from '@hapi/boom';
import fetch from 'node-fetch-retry';

export default async (request, h) => {
  const baseUri = request.container('Service').getUri('analytics');
  const {
    auth: {
      credentials: { jwt }
    },
    params: { entity, id }
  } = request;

  try {
    const response = await fetch(`${baseUri}/${entity}/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwt}` },
      retry: 3,
      pause: 1000,
      callback: (retry) => {
        console.log(`Trying: ${retry}`);
      }
    });
    const result = await response.json();

    return h.response(result).code(response.status);
  } catch (error) {
    console.error('[HANDLER]', error);
    return Boom.gatewayTimeout('There might be a problem. Please, try again.');
  }
};
