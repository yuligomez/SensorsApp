import * as Boom from '@hapi/boom';

export default async (request) => {
  const service = request.container('ObservableService');
  const result = service.findPopulated({}, 'sensors');

  if (result?.constructor === Error) throw Boom.badRequest(result.message);
  if (!result) throw Boom.notFound(`Observable property: ${name} not found`);

  return result;
};
