import { SensorsHandler as handler } from '../handlers';
import { Sensor as schema } from '../schemas/requests';

const externalPath = '/external/sensors';
const internalPath = '/internal/sensors';
const { rules } = schema;

export const sensors = [
  {
    method: 'get',
    path: externalPath,
    options: {
      tags: ['api'],
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Get set of sensors',
      notes: 'Returns a set of all sensors'
    },
    handler: handler.list
  },
  {
    method: 'get',
    path: internalPath,
    options: {
      tags: ['api'],
      validate: rules.internalList,
      description: 'Get set of sensors',
      notes: 'Returns a set of all sensors'
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
      description: 'Get sensor by id',
      notes: 'Returns an sensor by the parameter passed in the path'
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
      description: 'Post sensor',
      notes: 'Returns the sensor passed in the body'
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
      description: 'Delete sensor by id',
      notes: 'Delete sensor by the parameter passed in the path'
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
      description: 'Put sensor by id',
      notes: 'Edit the sensor by the parameter passed in the path'
    }
  }
];
