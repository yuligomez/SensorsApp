import { SensorsHandler as handler } from '../handlers';
import { Sensor as schema } from '../schemas/requests';

const path = '/sensors';
const { rules } = schema;

export const sensors = [
  {
    method: 'post',
    path,
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
      description: 'Post a sensor',
      notes: 'Returns a sensor based in the body, calling the services Catalog'
    }
  }
];
