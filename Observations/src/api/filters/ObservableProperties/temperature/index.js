import { fahrenheitToCelsius, kelvinToCelsius } from './convertions';

const temperature = (data, unit) => {
  const { standardUnit, isStandardUnit } = unit;

  if (isStandardUnit) return data;

  switch (data.unit) {
    case 'F':
      return {
        ...data,
        unit: standardUnit,
        value: fahrenheitToCelsius(data.value)
      };

    case 'K':
      return {
        ...data,
        unit: standardUnit,
        value: kelvinToCelsius(data.value)
      };

    default:
      throw new Error('The units can only be Celsius, Fahrenheit or Kelvin');
  }
};

export default temperature;
