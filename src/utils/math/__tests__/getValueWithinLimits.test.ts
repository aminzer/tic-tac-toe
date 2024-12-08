import { formatTestName } from '@aminzer/describe-function-test';
import getValueWithinLimits from '../getValueWithinLimits';

describe(formatTestName(__filename), () => {
  it('should return the value when it is within the limits', () => {
    expect(getValueWithinLimits(5, { lowerLimit: 0, upperLimit: 10 })).toBe(5);
  });

  it('should return the lower limit when the value is below it', () => {
    expect(getValueWithinLimits(-5, { lowerLimit: 0, upperLimit: 10 })).toBe(0);
  });

  it('should return the upper limit when the value is above it', () => {
    expect(getValueWithinLimits(15, { lowerLimit: 0, upperLimit: 10 })).toBe(10);
  });

  it('should return the value when no limits are provided', () => {
    expect(getValueWithinLimits(5, {})).toBe(5);
  });

  it('should enforce only the lower limit when upper limit is not provided', () => {
    expect(getValueWithinLimits(-5, { lowerLimit: 0 })).toBe(0);
    expect(getValueWithinLimits(5, { lowerLimit: 0 })).toBe(5);
  });

  it('should enforce only the upper limit when lower limit is not provided', () => {
    expect(getValueWithinLimits(15, { upperLimit: 10 })).toBe(10);
    expect(getValueWithinLimits(5, { upperLimit: 10 })).toBe(5);
  });

  it('should handle cases where both lower and upper limits are undefined', () => {
    expect(getValueWithinLimits(5, { lowerLimit: undefined, upperLimit: undefined })).toBe(5);
  });

  it('should handle cases where lower limit equals upper limit', () => {
    expect(getValueWithinLimits(5, { lowerLimit: 5, upperLimit: 5 })).toBe(5);
    expect(getValueWithinLimits(3, { lowerLimit: 5, upperLimit: 5 })).toBe(5);
    expect(getValueWithinLimits(7, { lowerLimit: 5, upperLimit: 5 })).toBe(5);
  });
});
