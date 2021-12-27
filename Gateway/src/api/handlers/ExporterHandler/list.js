import * as Boom from '@hapi/boom';
import fetch from 'node-fetch-retry';

export default async (request, h) => {
  const baseUri = request.container('Service').getUri('exporter');
  const {
    auth: {
      credentials: { jwt }
    },
    params: { entity },
    headers: { token },
    raw: {
      req: { url }
    }
  } = request;

  const params = url.split('?')[1] || '';

  try {
    const response = await fetch(
      params ? `${baseUri}/${entity}?${params}` : `${baseUri}/${entity}`,
      {
        headers: { Authorization: `Bearer ${jwt}`, token },
        retry: 3,
        pause: 1000,
        callback: (retry) => {
          console.log(`Trying: ${retry}`);
        }
      }
    );

    const result = await response.json();

    return h.response(result).code(response.status);
  } catch (error) {
    console.error('[HANDLER]', error);
    return Boom.gatewayTimeout('There might be a problem. Please, try again.');
  }
};
