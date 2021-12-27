import { BarToPascal, ATMToPascal } from './convertions';

const airPressure = (data, unit) => {
  const { standardUnit, isStandardUnit } = unit;

  if (isStandardUnit) return data;

  switch (data.unit) {
    case 'BAR':
      return {
        ...data,
        unit: standardUnit,
        value: BarToPascal(data.value)
      };

    case 'ATM':
      return {
        ...data,
        unit: standardUnit,
        value: ATMToPascal(data.value)
      };

    default:
      throw new Error('The units can only be Pascal(PA), Atmósfera(ATM) or BAR');
  }
};

export default airPressure;
