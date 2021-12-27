import { mphToKmh, msToKmh } from './convertions';

const airVelocity = (data, unit) => {
  const { standardUnit, isStandardUnit } = unit;

  if (isStandardUnit) return data;

  switch (data.unit) {
    case 'MPH':
      return {
        ...data,
        unit: standardUnit,
        value: mphToKmh(data.value)
      };

    case 'MS':
      return {
        ...data,
        unit: standardUnit,
        value: msToKmh(data.value)
      };

    default:
      throw new Error('The units can only be KPH, MPH or MS');
  }
};

export default airVelocity;
