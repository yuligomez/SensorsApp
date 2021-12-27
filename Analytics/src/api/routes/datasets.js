import { DataSetsHandler as handler } from '../handlers';
import { DataSet as schema } from '../schemas/requests';

const externalPath = '/external/data-sets';
const { rules } = schema;

export const dataSets = [
  {
    method: 'get',
    path: externalPath,
    options: {
      tags: ['api'],
      validate: rules.list,
      auth: {
        mode: 'required',
        strategy: 'jwt'
      },
      description: 'Get set of data , with parameters: enddate, startdate, esn and property',
      notes: 'Returns a set of items by the parameters passed in the path'
    },
    handler: handler.list
  }
];
