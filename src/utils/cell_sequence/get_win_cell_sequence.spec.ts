import { Mark } from '../../constants';
import { Matrix } from '../../data_structures';
import { CellSequence } from '../../types';
import { getWinCellSequence } from './get_win_cell_sequence';

describe('utils > cell_sequence > getWinCellSequence', () => {
  interface TestCase {
    board: ('x' | 'o' | ' ')[][];
    expectation: {
      winner: 'x' | 'o';
      sequence: number[][];
    } | null;
  };

  const testCases: TestCase[] = [
    {
      board: [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ],
      expectation: null,
    },
    {
      board: [
        ['o', 'o', 'x'],
        ['x', 'x', 'o'],
        ['o', 'x', 'x'],
      ],
      expectation: null,
    },
    {
      board: [
        ['x', 'x', 'o', ' '],
        ['x', 'x', 'x', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'x',
        sequence: [[1, 0], [1, 1], [1, 2]],
      },
    },
    {
      board: [
        ['x', 'x', 'o', ' '],
        ['x', 'o', 'o', 'o'],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'o',
        sequence: [[1, 1], [1, 2], [1, 3]],
      },
    },
    {
      board: [
        ['o', 'o', ' ', ' '],
        ['x', 'x', ' ', ' '],
        ['o', 'x', ' ', ' '],
        [' ', 'x', ' ', ' '],
      ],
      expectation: {
        winner: 'x',
        sequence: [[1, 1], [2, 1], [3, 1]],
      },
    },
    {
      board: [
        [' ', 'x', ' ', ' '],
        ['o', 'o', 'x', ' '],
        [' ', ' ', ' ', 'x'],
        [' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'x',
        sequence: [[0, 1], [1, 2], [2, 3]],
      },
    },
    {
      board: [
        [' ', 'o', 'o', ' '],
        ['o', 'o', 'x', ' '],
        ['o', 'x', 'x', ' '],
        [' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'o',
        sequence: [[0, 2], [1, 1], [2, 0]],
      },
    },
  ];

  const getMark = (cell: 'x' | 'o' | ' '): Mark | undefined => {
    switch (cell) {
      case 'x':
        return Mark.CROSS;

      case 'o':
        return Mark.NOUGHT;

      default:
        return undefined;
    }
  }

  testCases.forEach(({ board, expectation }) => {
    let matrix: Matrix<Mark>;
    let expectedWinCellSequence: CellSequence | null = null;

    beforeEach(() => {
      const maxRowIndex = board.length;
      const maxColumnIndex = board[0].length;

      matrix = new Matrix<Mark>({ maxRowIndex, maxColumnIndex });

      board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          let mark = getMark(cell);

          if (mark) {
            matrix.set(rowIndex, columnIndex, mark);
          }
        });
      });

      if (expectation) {
        expectedWinCellSequence = {
          cells: expectation.sequence.map(([rowIndex, columnIndex]) => ({ rowIndex, columnIndex })),
          mark: getMark(expectation.winner) as Mark,
        }
      }
    });

    describe(`when board: ${JSON.stringify(board)}`, () => {
      it(`returns ${JSON.stringify(expectation)}`, () => {
        expect(
          getWinCellSequence(matrix, { winSequenceLength: 3 }),
        ).toEqual(expectedWinCellSequence);
      });
    });
  });
});
