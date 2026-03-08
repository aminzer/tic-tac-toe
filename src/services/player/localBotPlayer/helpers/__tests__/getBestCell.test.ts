import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import getBestCell from '../getBestCell';

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
  describe('when the matrix is empty', () => {
    it('returns the central cell', () => {
      const matrix = new Matrix<Mark>({ maxRowIndex: 4, maxColumnIndex: 4 });

      const bestCell = getBestCell(matrix, Mark.CROSS);

      expect(bestCell).toEqual({ rowIndex: 2, columnIndex: 2 });
    });
  });

  describe('when there is a winning move available', () => {
    it('takes the winning move horizontally', () => {
      const matrix = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'x', 'x', 'x', 'x', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const bestCell = getBestCell(matrix, Mark.CROSS);

      // Should place at one end to complete 5 in a row
      expect(
        (bestCell.rowIndex === 1 && bestCell.columnIndex === 5) ||
          (bestCell.rowIndex === 1 && bestCell.columnIndex === 0),
      ).toBe(true);
    });

    it('takes the winning move vertically', () => {
      const matrix = buildMatrix([
        [' ', ' ', ' '],
        [' ', 'o', ' '],
        [' ', 'o', ' '],
        [' ', 'o', ' '],
        [' ', 'o', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ]);

      const bestCell = getBestCell(matrix, Mark.NOUGHT);

      expect(
        (bestCell.rowIndex === 0 && bestCell.columnIndex === 1) ||
          (bestCell.rowIndex === 5 && bestCell.columnIndex === 1),
      ).toBe(true);
    });
  });

  describe('when the opponent has 4 in a row', () => {
    it('blocks the opponent from winning', () => {
      const matrix = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', 'o', 'o', 'o', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const bestCell = getBestCell(matrix, Mark.CROSS);

      // Must block at one end
      expect(
        (bestCell.rowIndex === 2 && bestCell.columnIndex === 0) ||
          (bestCell.rowIndex === 2 && bestCell.columnIndex === 5),
      ).toBe(true);
    });
  });

  describe('when the bot has a winning move and the opponent also threatens', () => {
    it('prefers winning over blocking', () => {
      const matrix = buildMatrix([
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'o', 'o', 'o', 'o', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ]);

      const bestCell = getBestCell(matrix, Mark.CROSS);

      // Should complete its own win rather than block
      expect(bestCell.rowIndex).toBe(1);
      expect(bestCell.columnIndex === 5 || bestCell.columnIndex === 0).toBe(true);
    });
  });
});
