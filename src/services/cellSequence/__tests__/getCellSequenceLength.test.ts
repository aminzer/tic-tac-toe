import { describeFunctionTest } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import getCellSequenceLength from '../getCellSequenceLength';

describeFunctionTest(getCellSequenceLength, __filename, {
  testCases: [
    {
      args: [],
      expectedResult: 0,
    },
    {
      args: [null],
      expectedResult: 0,
    },
    {
      args: [{ cells: [], mark: Mark.CROSS }],
      expectedResult: 0,
    },
    {
      args: [
        {
          cells: [
            { rowIndex: 2, columnIndex: 3 },
            { rowIndex: 2, columnIndex: 4 },
            { rowIndex: 2, columnIndex: 5 },
          ],
          mark: Mark.NOUGHT,
        },
      ],
      expectedResult: 3,
    },
  ],
});
