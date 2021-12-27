import { CatalogHandler as handler } from '../handlers';
import { Catalog as schema } from '../schemas/requests';

const path = '/catalog';
const { rules } = schema;

export const catalog = [
  {
    method: 'get',
    path: `${path}/{entity}`,
    options: {
      tags: ['api'],
      auth: {
        mode: 'required',
        strategy: 'session'
      },
      description: 'Get set of the entity passed in the path',
      notes: 'Returns a set of the entity passed in the path calling the services Catalog'
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
      auth: {
        mode: 'required',
        strategy: 'session'
      },
      description: 'Get entity passed in the path by the id',
      notes:
        'Returns an entity passed in the path calling the services Catalog by the id also in the path'
    }
  },
  {
    method: 'post',
    path: `${path}/{entity}`,
    handler: handler.create,
    options: {
      tags: ['api'],
      validate: rules.create,
      payload: {
        parse: true
      },
      auth: {
        mode: 'required',
        strategy: 'session'
      },
      description: 'Post an entity',
      notes:
        'Returns an entity passed in the parameter based in the body, calling the services Catalog'
    }
  },
  {
    method: 'delete',
    path: `${path}/{entity}/{id}`,
    handler: handler.remove,
    options: {
      tags: ['api'],
      validate: rules.get,
      auth: {
        mode: 'required',
        strategy: 'session'
      },
      description: 'Delete an entity by id',
      notes: 'Deletes an entity based in the id from the parameter, calling the services Catalog'
    }
  },
  {
    method: 'put',
    path: `${path}/{entity}/{id}`,
    handler: handler.update,
    options: {
      tags: ['api'],
      validate: rules.update,
      payload: {
        parse: true
      },
      auth: {
        mode: 'required',
        strategy: 'session'
      },
      description: 'Put an entity',
      notes:
        'Edit an entity passed in the body based in the id from the parameter, calling the services Catalog'
    }
  }
];
