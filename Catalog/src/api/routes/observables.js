import { ObservablesHandler as handler } from '../handlers';
import { Observable as schema } from '../schemas/requests';

const externalPath = '/external/observables';
const internalPath = '/internal/observables';
const { rules } = schema;

export const observables = [
  {
    method: 'get',
    path: externalPath,
    options: {
      tags: ['api'],
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Get set of observables properties',
      notes: 'Returns a set of all observables properties'
    },
    handler: handler.list
  },
  {
    method: 'get',
    path: internalPath,
    options: {
      tags: ['api'],
      validate: rules.internalList,
      description: 'Get set of observables properties',
      notes: 'Returns a set of all observables properties'
    },
    handler: handler.internalList
  },
  {
    method: 'get',
    path: `${externalPath}/{id}`,
    handler: handler.get,
    options: {
      tags: ['api'],
      validate: rules.get,
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Get observable property by id',
      notes: 'Returns an observable property by the parameter passed in the path'
    }
  },
  {
    method: 'post',
    path: externalPath,
    handler: handler.create,
    options: {
      tags: ['api'],
      validate: rules.create,
      payload: {
        parse: true
      },
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Post observable property',
      notes: 'Returns the observable property passed in the body'
    }
  },
  {
    method: 'delete',
    path: `${externalPath}/{id}`,
    handler: handler.remove,
    options: {
      tags: ['api'],
      validate: rules.get,
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Delete observable property by id',
      notes: 'Delete observable property by the parameter passed in the path'
    }
  },
  {
    method: 'put',
    path: `${externalPath}/{id}`,
    handler: handler.update,
    options: {
      tags: ['api'],
      validate: rules.update,
      payload: {
        parse: true
      },
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Put observable property by id',
      notes: 'Edit the observable property by the parameter passed in the path'
    }
  }
];
