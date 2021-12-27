import fetch from 'node-fetch-retry';

export default async (request, h) => {
  const baseUri = request.container('Service').getUri('catalog');
  const {
    auth: {
      credentials: { jwt }
    },
    params: { entity, id },
    payload
  } = request;

  try {
    const response = await fetch(`${baseUri}/${entity}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
      retry: 3,
      pause: 1000,
      callback: (retry) => {
        console.log(`Trying: ${retry}`);
      }
    });

    return h.response().code(response.status);
  } catch (error) {
    console.error('[HANDLER]', error);
    return Boom.gatewayTimeout('There might be a problem. Please, try again.');
  }
};
