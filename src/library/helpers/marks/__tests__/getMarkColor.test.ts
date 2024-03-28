import { Mark } from '../../../../constants';
import { describeFunctionTest } from '../../../../test';
import getMarkColor from '../getMarkColor';

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

describeFunctionTest(getMarkColor, __filename, {
  testCases: [
    {
      args: [
        {
          mark: Mark.CROSS,
          theme,
        },
      ],
      expectedResult: '#f00',
    },
    {
      args: [
        {
          mark: Mark.CROSS,
          type: 'default',
          theme,
        },
      ],
      expectedResult: '#f00',
    },
    {
      args: [
        {
          mark: Mark.CROSS,
          type: 'dark',
          theme,
        },
      ],
      expectedResult: '#700',
    },
    {
      args: [
        {
          mark: Mark.NOUGHT,
          theme,
        },
      ],
      expectedResult: '#00f',
    },
    {
      args: [
        {
          mark: Mark.NOUGHT,
          type: 'default',
          theme,
        },
      ],
      expectedResult: '#00f',
    },
    {
      args: [
        {
          mark: Mark.NOUGHT,
          type: 'dark',
          theme,
        },
      ],
      expectedResult: '#007',
    },
  ],
});
