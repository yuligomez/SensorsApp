import * as Boom from '@hapi/boom';
import fetch from 'node-fetch-retry';

export default async (request, h) => {
  const {
    query: { startdate, enddate, esn, time, property }
  } = request;
  const baseUri = request.container('Service').getUri('observations');
  console.log('URI: ', baseUri);

  const startDateValue = startdate.toLocaleDateString('en-CA');
  const endDateValue = enddate.toLocaleDateString('en-CA');

  try {
    const response = await fetch(
      `${baseUri}?startdate=${startDateValue}&enddate=${endDateValue}&time=${time}&esn=${esn}&property=${property}`,
      {
        method: 'GET',
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

  return result;
};
