import fetch from 'node-fetch-retry';
import { getObservableData, getRandomInteger, getRequestObj } from './utils';

const sensorSimulator = async (sensors, uri) => {
  setInterval(async () => {
    console.log('\n SENDING SENSOR DATA ##################################\n');

    const { esn, observables, token } = sensors[getRandomInteger(0, sensors.length - 1)];
    const { name } = observables[getRandomInteger(0, observables.length - 1)];
    const { unit, value } = getObservableData(name);

    const sensorData = {
      esn,
      observableProperty: name,
      unit,
      value
    };

    console.log('Sensor Data: ', sensorData);

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const response = await fetch(uri, getRequestObj('POST', sensorData, headers));

    const { status, statusText } = response;

    console.log('\n---------------------------------------------------------------\n');
    console.log('Response Status: ', status + '\n');
    console.log('Response Text: ', statusText + '\n');
    console.log('####################################################################\n');
  }, getRandomInteger(500, 2500));
};

export default sensorSimulator;
