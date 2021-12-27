const standardUnitObj = {
  temperature: 'C',
  airVelocity: 'KPH',
  airPressure: 'PA'
};

const getStandardUnit = (observableProperty, unit) => {
  const standardUnit = standardUnitObj[observableProperty];

  return {
    standardUnit,
    isStandardUnit: standardUnit === unit
  };
};

export default getStandardUnit;
