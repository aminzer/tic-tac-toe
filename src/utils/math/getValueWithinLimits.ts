const getValueWithinLimits = (
  value: number,
  { lowerLimit, upperLimit }: { lowerLimit?: number; upperLimit?: number },
): number => {
  if (typeof lowerLimit === 'number' && value < lowerLimit) {
    return lowerLimit;
  }

  if (typeof upperLimit === 'number' && value > upperLimit) {
    return upperLimit;
  }

  return value;
};

export default getValueWithinLimits;
