import { formatTestName } from '@aminzer/describe-function-test';
import removeArrayElement from '../removeArrayElement';

describe(formatTestName(__filename), () => {
  it('should remove the element from the array if it exists', () => {
    const array = [1, 2, 3, 4, 5];
    const valueToRemove = 3;

    const result = removeArrayElement(array, valueToRemove);

    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 4, 5]);
  });

  it('should not modify the array if the element does not exist', () => {
    const array = [1, 2, 3, 4, 5];
    const valueToRemove = 6;

    const result = removeArrayElement(array, valueToRemove);

    expect(result).toBe(false);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  it('should remove only the first occurrence of the element', () => {
    const array = [1, 2, 3, 4, 5, 3];
    const valueToRemove = 3;

    const result = removeArrayElement(array, valueToRemove);

    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 4, 5, 3]);
  });

  it('should handle an empty array', () => {
    const array: number[] = [];
    const valueToRemove = 1;

    const result = removeArrayElement(array, valueToRemove);

    expect(result).toBe(false);
    expect(array).toEqual([]);
  });

  it('should handle arrays with different types of elements', () => {
    const array = ['a', 'b', 'c', 'd'];
    const valueToRemove = 'c';

    const result = removeArrayElement(array, valueToRemove);

    expect(result).toBe(true);
    expect(array).toEqual(['a', 'b', 'd']);
  });
});
