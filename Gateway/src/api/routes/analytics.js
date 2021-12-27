import { AnalyticsHandler as handler } from '../handlers';
import { Analytics as schema } from '../schemas/requests';

const path = '/analytics';
const { rules } = schema;

export const analytics = [
  {
    method: 'get',
    path: `${path}/{entity}`,
    options: {
      tags: ['api'],
      description: 'Get set of the entity passed in the path',
      notes: 'Returns a set of the entity passed in the path calling the services Analytic'
    },
    handler: handler.list
  },
  {
    method: 'get',
    path: `${path}/{entity}/{id}`,
    handler: handler.get,
    options: {
      tags: ['api'],
      validate: rules.get,
      description: 'Get entity passed in the path by the id',
      notes:
        'Returns an entity passed in the path calling the services Analytic by the id also in the path'
    }
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
        'Returns an entity passed in the parameter based in the body, calling the services Analytic'
    }
  },
  {
    method: 'delete',
    path: `${path}/{entity}/{id}`,
    handler: handler.remove,
    options: {
      tags: ['api'],
      validate: rules.get,
      description: 'Delete an entity by id',
      notes: 'Deletes an entity based in the id from the parameter, calling the services Analytic'
    }
  },
  {
    method: 'put',
    path: `${path}/{entity}/{id}`,
    handler: handler.update,
    options: {
      tags: ['api'],
      payload: {
        parse: true
      },
      validate: rules.update,
      description: 'Put an entity',
      notes:
        'Edit an entity passed in the body based in the id from the parameter, calling the services Analytic'
    }
  }
];
