import { Mark } from '../../constants';
import { Cell, CellSequence } from '../../types';
import isSequenceContainsCell from './isSequenceContainsCell';

describe('utils > cell_sequence > isSequenceContainsCell', () => {
  interface TestCase {
    cellSequence: CellSequence | undefined;
    cell: Cell;
    expectedResult: boolean;
  }

  const testCases: TestCase[] = [
    {
      cellSequence: undefined,
      cell: { rowIndex: 1, columnIndex: 1 },
      expectedResult: false,
    },
    {
      cellSequence: {
        cells: [],
        mark: Mark.CROSS,
      },
      cell: { rowIndex: 1, columnIndex: 1 },
      expectedResult: false,
    },
    {
      cellSequence: {
        cells: [
          { rowIndex: 0, columnIndex: 2 },
          { rowIndex: 1, columnIndex: 2 },
          { rowIndex: 2, columnIndex: 2 },
        ],
        mark: Mark.CROSS,
      },
      cell: { rowIndex: 1, columnIndex: 1 },
      expectedResult: false,
    },
    {
      cellSequence: {
        cells: [
          { rowIndex: 1, columnIndex: 0 },
          { rowIndex: 1, columnIndex: 1 },
          { rowIndex: 1, columnIndex: 2 },
        ],
        mark: Mark.CROSS,
      },
      cell: { rowIndex: 1, columnIndex: 1 },
      expectedResult: true,
    },
  ];

  testCases.forEach(({ cellSequence, cell, expectedResult }) => {
    describe(`when ${JSON.stringify({ cellSequence, cell })}`, () => {
      it(`returns ${expectedResult}`, () => {
        expect(isSequenceContainsCell(cellSequence, cell)).toEqual(expectedResult);
      });
    });
  });
});
