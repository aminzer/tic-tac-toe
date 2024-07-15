import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '../../../constants';
import { Cell, CellSequence } from '../../../types';
import calculateCellSequence from '../calculateCellSequence';

describe(formatTestName(__filename), () => {
  interface TestCase {
    cellSequence: CellSequence | null;
    nextCell: Cell;
    nextMark?: Mark;
    expectedCalculatedCellSequence: CellSequence | null;
  }

  const testCaseDefaults = {
    cellSequence: {
      cells: [
        { rowIndex: 0, columnIndex: 0 },
        { rowIndex: 0, columnIndex: 1 },
      ],
      mark: Mark.CROSS,
    },
    nextCell: { rowIndex: 0, columnIndex: 2 },
  };

  const testCases: TestCase[] = [
    {
      ...testCaseDefaults,
      nextMark: undefined,
      expectedCalculatedCellSequence: null,
    },
    {
      ...testCaseDefaults,
      nextMark: Mark.NOUGHT,
      expectedCalculatedCellSequence: {
        cells: [{ rowIndex: 0, columnIndex: 2 }],
        mark: Mark.NOUGHT,
      },
    },
    {
      ...testCaseDefaults,
      nextMark: Mark.CROSS,
      expectedCalculatedCellSequence: {
        cells: [
          { rowIndex: 0, columnIndex: 0 },
          { rowIndex: 0, columnIndex: 1 },
          { rowIndex: 0, columnIndex: 2 },
        ],
        mark: Mark.CROSS,
      },
    },
    {
      ...testCaseDefaults,
      cellSequence: null,
      nextMark: undefined,
      expectedCalculatedCellSequence: null,
    },
    {
      ...testCaseDefaults,
      cellSequence: null,
      nextMark: Mark.CROSS,
      expectedCalculatedCellSequence: {
        cells: [{ rowIndex: 0, columnIndex: 2 }],
        mark: Mark.CROSS,
      },
    },
  ];

  testCases.forEach(({ cellSequence, nextCell, nextMark, expectedCalculatedCellSequence }) => {
    describe(`when ${JSON.stringify({ cellSequence, nextCell, nextMark })}`, () => {
      it(`returns ${JSON.stringify(expectedCalculatedCellSequence)}`, () => {
        expect(calculateCellSequence(cellSequence, nextCell, nextMark)).toEqual(
          expectedCalculatedCellSequence,
        );
      });
    });
  });
});
