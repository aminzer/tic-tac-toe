import { describeFunctionTest } from '@aminzer/describe-function-test';
import isSequenceContainsCell from '../isSequenceContainsCell';

describeFunctionTest(isSequenceContainsCell, __filename, {
  testCases: [
    {
      args: [undefined, { rowIndex: 1, columnIndex: 1 }],
      expectedResult: false,
    },
    {
      args: [
        {
          cells: [],
        },
        { rowIndex: 1, columnIndex: 1 },
      ],
      expectedResult: false,
    },
    {
      args: [
        {
          cells: [
            { rowIndex: 0, columnIndex: 2 },
            { rowIndex: 1, columnIndex: 2 },
            { rowIndex: 2, columnIndex: 2 },
          ],
        },
        { rowIndex: 1, columnIndex: 1 },
      ],
      expectedResult: false,
    },
    {
      args: [
        {
          cells: [
            { rowIndex: 1, columnIndex: 0 },
            { rowIndex: 1, columnIndex: 1 },
            { rowIndex: 1, columnIndex: 2 },
          ],
        },
        { rowIndex: 1, columnIndex: 1 },
      ],
      expectedResult: true,
    },
  ],
});
