import { ExportsHandler as handler } from '../handlers';
import { Export as schema } from '../schemas/requests';

const externalPath = '/external/exports';
const { rules } = schema;

export const exports = [
  {
    method: 'get',
    path: externalPath,
    options: {
      tags: ['api'],
      validate: rules.list,
      description: 'Get set of data from observation',
      notes: 'Returns a set of data based on email and token passed in the parameters'
    },
    handler: handler.list
  }
];
