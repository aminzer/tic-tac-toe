import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { CellSequence } from '@app/types';
import getWinCellSequence from '../getWinCellSequence';

type Board = ('x' | 'o' | ' ')[][];

const formatBoard = (board: Board): string =>
  `\n${board.map((row) => JSON.stringify(row)).join('\n')}\n`;

describe(formatTestName(__filename), () => {
  interface TestCase {
    board: Board;
    options?: {
      winSequenceLength?: number;
    };
    expectation: {
      winner: 'x' | 'o';
      sequence: number[][];
    } | null;
  }

  const testCases: TestCase[] = [
    {
      board: [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ],
      options: {
        winSequenceLength: 3,
      },
      expectation: null,
    },
    {
      board: [
        ['o', 'o', 'x'],
        ['x', 'x', 'o'],
        ['o', 'x', 'x'],
      ],
      options: {
        winSequenceLength: 3,
      },
      expectation: null,
    },
    {
      board: [
        ['x', 'x', 'o', ' '],
        ['x', 'x', 'x', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
      ],
      options: {
        winSequenceLength: 3,
      },
      expectation: {
        winner: 'x',
        sequence: [
          [1, 0],
          [1, 1],
          [1, 2],
        ],
      },
    },
    {
      board: [
        ['x', 'x', 'o', ' '],
        ['x', 'o', 'o', 'o'],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
      ],
      options: {
        winSequenceLength: 3,
      },
      expectation: {
        winner: 'o',
        sequence: [
          [1, 1],
          [1, 2],
          [1, 3],
        ],
      },
    },
    {
      board: [
        ['o', 'o', ' ', ' '],
        ['x', 'x', ' ', ' '],
        ['o', 'x', ' ', ' '],
        [' ', 'x', ' ', ' '],
      ],
      options: {
        winSequenceLength: 3,
      },
      expectation: {
        winner: 'x',
        sequence: [
          [1, 1],
          [2, 1],
          [3, 1],
        ],
      },
    },
    {
      board: [
        [' ', 'x', ' ', ' '],
        ['o', 'o', 'x', ' '],
        [' ', ' ', ' ', 'x'],
        [' ', ' ', ' ', ' '],
      ],
      options: {
        winSequenceLength: 3,
      },
      expectation: {
        winner: 'x',
        sequence: [
          [0, 1],
          [1, 2],
          [2, 3],
        ],
      },
    },
    {
      board: [
        [' ', 'o', 'o', ' '],
        ['o', 'o', 'x', ' '],
        ['o', 'x', 'x', ' '],
        [' ', ' ', ' ', ' '],
      ],
      options: {
        winSequenceLength: 3,
      },
      expectation: {
        winner: 'o',
        sequence: [
          [0, 2],
          [1, 1],
          [2, 0],
        ],
      },
    },
    {
      board: [
        [' ', ' ', 'o', 'o', ' '],
        [' ', 'o', 'o', 'x', ' '],
        [' ', 'o', 'x', 'x', ' '],
        [' ', ' ', ' ', ' ', ' '],
      ],
      options: {
        winSequenceLength: 4,
      },
      expectation: null,
    },
    {
      board: [
        [' ', ' ', 'o', 'o', ' '],
        [' ', 'o', 'o', 'x', ' '],
        [' ', 'o', 'x', 'x', ' '],
        ['o', ' ', ' ', ' ', ' '],
      ],
      options: {
        winSequenceLength: 4,
      },
      expectation: {
        winner: 'o',
        sequence: [
          [0, 3],
          [1, 2],
          [2, 1],
          [3, 0],
        ],
      },
    },
    {
      board: [
        [' ', ' ', 'o', 'o', ' ', ' '],
        [' ', 'o', 'o', 'x', ' ', ' '],
        [' ', 'o', 'x', 'x', ' ', ' '],
        ['o', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
      ],
      expectation: null,
    },
    {
      board: [
        [' ', ' ', 'o', 'o', ' ', ' '],
        [' ', 'o', 'o', 'x', ' ', ' '],
        [' ', 'o', 'x', 'x', ' ', ' '],
        ['o', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', 'o', ' ', ' '],
      ],
      expectation: null,
    },
    {
      board: [
        ['o', 'o', 'o', 'o', ' ', ' '],
        [' ', 'o', 'o', 'x', ' ', ' '],
        [' ', 'o', 'x', 'x', ' ', ' '],
        ['o', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', 'x', ' ', ' '],
      ],
      expectation: {
        winner: 'x',
        sequence: [
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
        ],
      },
    },
    {
      board: [
        ['o', 'o', 'o', 'o', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', 'o', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', 'x', ' ', ' ', ' ', ' ', ' ', ' '],
        ['o', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'x',
        sequence: [
          [4, 1],
          [4, 2],
          [4, 3],
          [4, 4],
          [4, 5],
          [4, 6],
          [4, 7],
        ],
      },
    },
    {
      board: [
        ['o', 'o', 'o', 'o', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', 'o', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', 'x', 'x', 'x', 'x', ' ', ' ', ' '],
        ['o', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'x',
        sequence: [
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
          [6, 3],
          [7, 3],
          [8, 3],
          [9, 3],
        ],
      },
    },
    {
      board: [
        [' ', 'o', 'o', 'o', 'o', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', 'o', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' '],
        [' ', 'o', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', ' ', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', ' ', ' ', ' ', 'x', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', ' ', ' ', ' ', ' ', 'x', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'x',
        sequence: [
          [2, 3],
          [3, 4],
          [4, 5],
          [5, 6],
          [6, 7],
          [7, 8],
          [8, 9],
        ],
      },
    },
    {
      board: [
        [' ', 'o', 'o', 'o', 'o', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', 'o', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', 'x', 'x', 'x', 'x', 'o', ' ', ' ', ' '],
        [' ', 'o', ' ', ' ', 'x', ' ', 'o', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', ' ', ' ', 'o', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', ' ', 'o', ' ', 'x', ' ', ' ', ' ', ' '],
        [' ', ' ', 'o', 'o', ' ', ' ', ' ', 'x', ' ', ' ', ' '],
        [' ', ' ', 'o', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' '],
        [' ', 'o', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ],
      expectation: {
        winner: 'o',
        sequence: [
          [2, 7],
          [3, 6],
          [4, 5],
          [5, 4],
          [6, 3],
          [7, 2],
          [8, 1],
        ],
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
  };

  testCases.forEach(({ board, options, expectation }) => {
    let matrix: Matrix<Mark>;
    let expectedWinCellSequence: CellSequence | null = null;

    beforeEach(() => {
      const maxRowIndex = board.length;
      const maxColumnIndex = board[0].length;

      matrix = new Matrix<Mark>({ maxRowIndex, maxColumnIndex });

      board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          const mark = getMark(cell);

          if (mark) {
            matrix.set(rowIndex, columnIndex, mark);
          }
        });
      });

      if (expectation) {
        expectedWinCellSequence = {
          cells: expectation.sequence.map(([rowIndex, columnIndex]) => ({ rowIndex, columnIndex })),
          mark: getMark(expectation.winner) as Mark,
        };
      }
    });

    describe(`when board: ${formatBoard(board)} and options: ${JSON.stringify(options)}`, () => {
      it(`returns ${JSON.stringify(expectation)}`, () => {
        expect(getWinCellSequence(matrix, options)).toEqual(expectedWinCellSequence);
      });
    });
  });
});
