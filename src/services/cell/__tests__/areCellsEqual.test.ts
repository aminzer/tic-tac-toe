import { describeFunctionTest } from '../../../test';
import areCellsEqual from '../areCellsEqual';

describeFunctionTest(areCellsEqual, __filename, {
  testCases: [
    {
      description: 'when cells have different row and column indexes',
      args: [
        { rowIndex: 1, columnIndex: 2 },
        { rowIndex: 2, columnIndex: 3 },
      ],
      expectedResult: false,
    },
    {
      description: 'when cells have different row indexes',
      args: [
        { rowIndex: 1, columnIndex: 2 },
        { rowIndex: 2, columnIndex: 2 },
      ],
      expectedResult: false,
    },
    {
      description: 'when cells have different column indexes',
      args: [
        { rowIndex: 1, columnIndex: 2 },
        { rowIndex: 1, columnIndex: 3 },
      ],
      expectedResult: false,
    },
    {
      description: 'when cells have equal row and column indexes',
      args: [
        { rowIndex: 1, columnIndex: 2 },
        { rowIndex: 1, columnIndex: 2 },
      ],
      expectedResult: true,
    },
  ],
});
