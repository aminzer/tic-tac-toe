import { Mark } from '../../../../constants';
import getMarkColor from '../getMarkColor';

describe('library > helpers > marks > getMarkColor', () => {
  const theme = {
    palette: {
      marks: {
        cross: {
          default: '#f00',
          dark: '#700',
        },
        nought: {
          default: '#00f',
          dark: '#007',
        },
      },
    },
  };

  interface TestCase {
    args: Parameters<typeof getMarkColor>[0];
    expectedResult: string;
  }

  const testCases: TestCase[] = [
    {
      args: {
        mark: Mark.CROSS,
        theme,
      },
      expectedResult: '#f00',
    },
    {
      args: {
        mark: Mark.CROSS,
        type: 'default',
        theme,
      },
      expectedResult: '#f00',
    },
    {
      args: {
        mark: Mark.CROSS,
        type: 'dark',
        theme,
      },
      expectedResult: '#700',
    },
    {
      args: {
        mark: Mark.NOUGHT,
        theme,
      },
      expectedResult: '#00f',
    },
    {
      args: {
        mark: Mark.NOUGHT,
        type: 'default',
        theme,
      },
      expectedResult: '#00f',
    },
    {
      args: {
        mark: Mark.NOUGHT,
        type: 'dark',
        theme,
      },
      expectedResult: '#007',
    },
  ];

  testCases.forEach(({ args, expectedResult }) => {
    describe(`when args are ${JSON.stringify(args)} `, () => {
      it(`should return ${expectedResult}`, () => {
        expect(getMarkColor(args)).toBe(expectedResult);
      });
    });
  });
});
