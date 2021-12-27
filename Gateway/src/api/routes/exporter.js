import { ExporterHandler as handler } from '../handlers';
import { Exporter as schema } from '../schemas/requests';

const path = '/exporter';
const { rules } = schema;

export const exporter = [
  {
    method: 'get',
    path: `${path}/{entity}`,
    options: {
      tags: ['api'],
      description: 'Get set of the entity passed in the path',
      notes: 'Returns a set of the entity passed in the path calling the services Exporter'
    },
    handler: handler.list
  },
  {
    method: 'post',
    path: `${path}/{entity}`,
    handler: handler.create,
    options: {
      tags: ['api'],
      payload: {
        parse: true
      },
      validate: rules.create,
      description: 'Post an entity',
      notes:
        'Returns an entity passed in the parameter based in the body, calling the services Exporter'
    }
  }
];
