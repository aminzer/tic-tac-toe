import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import { OFFENSE_WEIGHT, SCORE_TABLE, WIN_SCORE } from '../constants';
import evaluateCell from '../evaluateCell';

type Board = ('x' | 'o' | ' ')[][];

const buildMatrix = (board: Board): Matrix<Mark> => {
  const matrix = new Matrix<Mark>({
    maxRowIndex: board.length - 1,
    maxColumnIndex: board[0].length - 1,
  });

  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === 'x') {
        matrix.set(rowIndex, columnIndex, Mark.CROSS);
      } else if (cell === 'o') {
        matrix.set(rowIndex, columnIndex, Mark.NOUGHT);
      }
    });
  });

  return matrix;
};

describe(formatTestName(__filename), () => {
  describe('when placing a mark completes a winning sequence', () => {
    it('returns WIN_SCORE for a horizontal win', () => {
      const matrix = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'x', 'x', 'x', 'x', ' '],
        [' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const cell = { rowIndex: 1, columnIndex: 5 };
      const score = evaluateCell(matrix, cell, Mark.CROSS);

      expect(score).toBeGreaterThanOrEqual(WIN_SCORE);
    });

    it('returns WIN_SCORE for a vertical win', () => {
      const matrix = buildMatrix([
        [' ', 'o', ' '],
        [' ', 'o', ' '],
        [' ', 'o', ' '],
        [' ', 'o', ' '],
        [' ', ' ', ' '],
      ]);

      const cell = { rowIndex: 4, columnIndex: 1 };
      const score = evaluateCell(matrix, cell, Mark.NOUGHT);

      expect(score).toBeGreaterThanOrEqual(WIN_SCORE);
    });

    it('returns WIN_SCORE when filling the middle of a sequence', () => {
      const matrix = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'x', 'x', ' ', 'x', 'x'],
        [' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const cell = { rowIndex: 1, columnIndex: 3 };
      const score = evaluateCell(matrix, cell, Mark.CROSS);

      expect(score).toBeGreaterThanOrEqual(WIN_SCORE);
    });
  });

  describe('when the sequence is blocked by the opponent', () => {
    it('returns 0 for a direction with no room to reach 5', () => {
      // Horizontal direction is fully blocked: o x x [cell] o
      // Only 4 cells of space total (less than WIN_SEQUENCE_LENGTH)
      const matrix = buildMatrix([['o', 'x', 'x', ' ', 'o']]);

      const cell = { rowIndex: 0, columnIndex: 3 };
      const score = evaluateCell(matrix, cell, Mark.CROSS);

      // The horizontal direction should score 0 because totalOpenSpace < 5
      // Other directions may still contribute score
      expect(score).toBeLessThan(WIN_SCORE);
    });
  });

  describe('offensive vs defensive scoring', () => {
    it('scores offensive threats higher than equal defensive threats due to OFFENSE_WEIGHT', () => {
      const offensiveBoard = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'x', 'x', 'x', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const defensiveBoard = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'o', 'o', 'o', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const cell = { rowIndex: 3, columnIndex: 6 };

      const offensiveScore = evaluateCell(offensiveBoard, cell, Mark.CROSS);
      const defensiveScore = evaluateCell(defensiveBoard, cell, Mark.CROSS);

      expect(offensiveScore).toBeGreaterThan(defensiveScore);
    });
  });

  describe('scoring for sequences of different lengths', () => {
    it('scores a cell extending a longer sequence higher than a shorter one', () => {
      const threeInARow = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'x', 'x', 'x', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const twoInARow = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'x', 'x', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const cell = { rowIndex: 1, columnIndex: 5 };

      const scoreForFour = evaluateCell(threeInARow, cell, Mark.CROSS);
      const scoreForThree = evaluateCell(twoInARow, cell, Mark.CROSS);

      expect(scoreForFour).toBeGreaterThan(scoreForThree);
    });
  });

  describe('when the cell is isolated', () => {
    it('returns a score based on single-mark sequences', () => {
      const matrix = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const cell = { rowIndex: 2, columnIndex: 3 };
      const score = evaluateCell(matrix, cell, Mark.CROSS);

      // 4 directions, each scoring SCORE_TABLE[1] = 1 for offense and defense
      const expectedOffensive = 4 * SCORE_TABLE[1];
      const expectedDefensive = 4 * SCORE_TABLE[1];

      expect(score).toBe(expectedOffensive * OFFENSE_WEIGHT + expectedDefensive);
    });
  });
});
