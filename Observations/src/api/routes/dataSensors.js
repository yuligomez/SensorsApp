import { DataSensorHandler as handler } from '../handlers';
import { DataSensor as schema } from '../schemas/requests';

const internalPath = '/internal/data-sensors';
const { rules } = schema;

export const dataSensors = [
  {
    method: 'get',
    path: internalPath,
    options: {
      tags: ['api'],
      validate: rules.list,
      description: 'Get set of senors data',
      notes: 'Returns a set of all sensors based on the parameters passed in the path'
    },
    handler: handler.list
  }
];
