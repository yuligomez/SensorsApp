import * as Boom from '@hapi/boom';
import fetch from 'node-fetch-retry';

export default async (request, h) => {
  const baseUri = request.container('Service').getUri('catalog');
  const {
    auth: {
      credentials: { jwt }
    },
    params: { entity },
    payload
  } = request;

  try {
    let data = payload;

    if (entity === 'sensors') {
      const jwt = request.container('Jwt');
      const token = await jwt.signTokenWithSecret(payload, 36000);
      data = { ...data, token };
    }

    const response = await fetch(`${baseUri}/${entity}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
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
