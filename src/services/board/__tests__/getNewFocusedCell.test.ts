import { describeFunctionTest } from '@aminzer/describe-function-test';
import getNewFocusedCell from '../getNewFocusedCell';

const boardLimits = {
  minRowIndex: -5,
  maxRowIndex: 5,
  minColumnIndex: 10,
  maxColumnIndex: 20,
};

describeFunctionTest(getNewFocusedCell, __filename, {
  testCaseGroups: [
    {
      description: 'when previously focused cell is in the middle',
      testCases: [
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 0, columnIndex: 15 },
              focusedCellChange: { rowDelta: 1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: 1, columnIndex: 15 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 0, columnIndex: 15 },
              focusedCellChange: { rowDelta: -1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: -1, columnIndex: 15 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 0, columnIndex: 15 },
              focusedCellChange: { rowDelta: 0, columnDelta: 1 },
            },
          ],
          expectedResult: { rowIndex: 0, columnIndex: 16 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 0, columnIndex: 15 },
              focusedCellChange: { rowDelta: 0, columnDelta: -1 },
            },
          ],
          expectedResult: { rowIndex: 0, columnIndex: 14 },
        },
      ],
    },
    {
      description: 'when previously focused cell is in the top-left corner',
      testCases: [
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 10 },
              focusedCellChange: { rowDelta: 1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: -4, columnIndex: 10 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 10 },
              focusedCellChange: { rowDelta: -1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: 5, columnIndex: 10 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 10 },
              focusedCellChange: { rowDelta: 0, columnDelta: 1 },
            },
          ],
          expectedResult: { rowIndex: -5, columnIndex: 11 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 10 },
              focusedCellChange: { rowDelta: 0, columnDelta: -1 },
            },
          ],
          expectedResult: { rowIndex: -5, columnIndex: 20 },
        },
      ],
    },
    {
      description: 'when previously focused cell is in the top-right corner',
      testCases: [
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 20 },
              focusedCellChange: { rowDelta: 1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: -4, columnIndex: 20 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 20 },
              focusedCellChange: { rowDelta: -1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: 5, columnIndex: 20 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 20 },
              focusedCellChange: { rowDelta: 0, columnDelta: 1 },
            },
          ],
          expectedResult: { rowIndex: -5, columnIndex: 10 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: -5, columnIndex: 20 },
              focusedCellChange: { rowDelta: 0, columnDelta: -1 },
            },
          ],
          expectedResult: { rowIndex: -5, columnIndex: 19 },
        },
      ],
    },
    {
      description: 'when previously focused cell is in the bottom-left corner',
      testCases: [
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 10 },
              focusedCellChange: { rowDelta: 1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: -5, columnIndex: 10 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 10 },
              focusedCellChange: { rowDelta: -1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: 4, columnIndex: 10 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 10 },
              focusedCellChange: { rowDelta: 0, columnDelta: 1 },
            },
          ],
          expectedResult: { rowIndex: 5, columnIndex: 11 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 10 },
              focusedCellChange: { rowDelta: 0, columnDelta: -1 },
            },
          ],
          expectedResult: { rowIndex: 5, columnIndex: 20 },
        },
      ],
    },
    {
      description: 'when previously focused cell is in the bottom-right corner',
      testCases: [
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 20 },
              focusedCellChange: { rowDelta: 1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: -5, columnIndex: 20 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 20 },
              focusedCellChange: { rowDelta: -1, columnDelta: 0 },
            },
          ],
          expectedResult: { rowIndex: 4, columnIndex: 20 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 20 },
              focusedCellChange: { rowDelta: 0, columnDelta: 1 },
            },
          ],
          expectedResult: { rowIndex: 5, columnIndex: 10 },
        },
        {
          args: [
            {
              boardLimits,
              prevFocusedCell: { rowIndex: 5, columnIndex: 20 },
              focusedCellChange: { rowDelta: 0, columnDelta: -1 },
            },
          ],
          expectedResult: { rowIndex: 5, columnIndex: 19 },
        },
      ],
    },
  ],
});
