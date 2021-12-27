import getStandardUnit from './getStandardUnit';
import { airVelocity, airPressure, temperature } from './ObservableProperties';

const filters = (data) => {
  if (!data?.observableProperty) return null;

  const standarUnit = getStandardUnit(data.observableProperty, data.unit);

  try {
    switch (data.observableProperty) {
      case 'temperature':
        return temperature(data, standarUnit);

      case 'airVelocity':
        return airVelocity(data, standarUnit);

      case 'airPressure':
        return airPressure(data, standarUnit);

      default:
        return data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default filters;
