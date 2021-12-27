import { getRandomFloat } from '.';
import { getRandomInteger } from '.';

const temperatureUnits = ['C', 'F', 'K'];
const airVelocityUnits = ['KPH', 'MPH', 'MS'];
const airPressureUnits = ['PA', 'BAR', 'ATM'];

const getTemperatureValue = (unit) => {
  switch (unit) {
    case 'F':
      return getRandomFloat(-58, 122);

    case 'K':
      return getRandomFloat(224, 324);

    default:
      return getRandomFloat(-50, 50);
  }
};

const getAirVelocityValue = (unit) => {
  switch (unit) {
    case 'MPH':
      return getRandomFloat(0, 435);

    case 'MS':
      return getRandomFloat(0, 195);

    default:
      return getRandomFloat(0, 700);
  }
};

const getAirPressureValue = (unit) => {
  switch (unit) {
    case 'BAR':
      return getRandomFloat(0.85, 1.15);

    case 'ATM':
      return getRandomFloat(0.75, 1.05);

    default:
      return getRandomFloat(85000, 115000);
  }
};

const getObservableData = (observableProperty) => {
  let unit = 'C';
  let value = 24;

  switch (observableProperty) {
    case 'temperature':
      unit = temperatureUnits[getRandomInteger(0, temperatureUnits.length - 1)];
      value = getTemperatureValue(unit);
      break;

    case 'humidity':
      unit = '%';
      value = getRandomFloat(0, 100);
      break;

    case 'airVelocity':
      unit = airVelocityUnits[getRandomInteger(0, airVelocityUnits.length - 1)];
      value = getAirVelocityValue(unit);
      break;

    case 'airPressure':
      unit = airPressureUnits[getRandomInteger(0, airPressureUnits.length - 1)];
      value = getAirPressureValue(unit);
      break;

    default:
      break;
  }

  return { unit, value };
};

export default getObservableData;
