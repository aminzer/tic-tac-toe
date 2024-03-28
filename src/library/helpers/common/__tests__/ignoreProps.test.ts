import { formatTestName } from '../../../../test';
import ignoreProps from '../ignoreProps';

describe(formatTestName(__filename), () => {
  interface TestCase {
    ignoredProps: string[];
    prop: string;
    expectPropToBeForwarded: boolean;
  }

  const testCases: TestCase[] = [
    {
      ignoredProps: [],
      prop: 'property_1',
      expectPropToBeForwarded: true,
    },
    {
      ignoredProps: ['property_1', 'property_2'],
      prop: 'property_1',
      expectPropToBeForwarded: false,
    },
    {
      ignoredProps: ['property_1', 'property_2'],
      prop: 'property_2',
      expectPropToBeForwarded: false,
    },
    {
      ignoredProps: ['property_1', 'property_2'],
      prop: 'property_3',
      expectPropToBeForwarded: true,
    },
  ];

  testCases.forEach(({ ignoredProps, prop, expectPropToBeForwarded }) => {
    describe(`when ignored properties are ${JSON.stringify(ignoredProps)} `, () => {
      describe(`when property is "${prop}"`, () => {
        it(`should${expectPropToBeForwarded ? ' ' : ' not '}forward property`, () => {
          expect(ignoreProps(...ignoredProps)(prop)).toBe(expectPropToBeForwarded);
        });
      });
    });
  });
});
