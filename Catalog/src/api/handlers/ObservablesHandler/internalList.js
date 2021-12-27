import * as Boom from '@hapi/boom';

export default async (request) => {
  const {
    container,
    query: { name }
  } = request;

  const service = container('ObservableService');
  const result = service.findOne({ name });

  if (result?.constructor === Error) throw Boom.badRequest(result.message);
  if (!result) throw Boom.notFound(`Observable property: ${name} not found`);

  return result;
};
