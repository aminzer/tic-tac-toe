import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import getNextCellCandidates from '../getNextCellCandidates';

describe(formatTestName(__filename), () => {
  describe('when the matrix has no marks', () => {
    it('returns the central cell', () => {
      const matrix = new Matrix<Mark>({ maxRowIndex: 4, maxColumnIndex: 4 });

      const candidates = getNextCellCandidates(matrix);

      expect(candidates).toEqual([{ rowIndex: 2, columnIndex: 2 }]);
    });
  });

  describe('when the matrix has a single mark', () => {
    it('returns all valid neighboring cells', () => {
      const matrix = new Matrix<Mark>({ maxRowIndex: 4, maxColumnIndex: 4 });
      matrix.set(2, 2, Mark.CROSS);

      const candidates = getNextCellCandidates(matrix);

      expect(candidates).toHaveLength(8);
      expect(candidates).toContainEqual({ rowIndex: 1, columnIndex: 1 });
      expect(candidates).toContainEqual({ rowIndex: 1, columnIndex: 2 });
      expect(candidates).toContainEqual({ rowIndex: 1, columnIndex: 3 });
      expect(candidates).toContainEqual({ rowIndex: 2, columnIndex: 1 });
      expect(candidates).toContainEqual({ rowIndex: 2, columnIndex: 3 });
      expect(candidates).toContainEqual({ rowIndex: 3, columnIndex: 1 });
      expect(candidates).toContainEqual({ rowIndex: 3, columnIndex: 2 });
      expect(candidates).toContainEqual({ rowIndex: 3, columnIndex: 3 });
    });
  });

  describe('when the mark is at a corner', () => {
    it('includes neighbors outside matrix bounds', () => {
      const matrix = new Matrix<Mark>({ maxRowIndex: 2, maxColumnIndex: 2 });
      matrix.set(0, 0, Mark.CROSS);

      const candidates = getNextCellCandidates(matrix);

      expect(candidates).toHaveLength(8);
      expect(candidates).toContainEqual({ rowIndex: 0, columnIndex: 1 });
      expect(candidates).toContainEqual({ rowIndex: 1, columnIndex: 0 });
      expect(candidates).toContainEqual({ rowIndex: 1, columnIndex: 1 });
      expect(candidates).toContainEqual({ rowIndex: -1, columnIndex: -1 });
      expect(candidates).toContainEqual({ rowIndex: -1, columnIndex: 0 });
      expect(candidates).toContainEqual({ rowIndex: -1, columnIndex: 1 });
      expect(candidates).toContainEqual({ rowIndex: 0, columnIndex: -1 });
      expect(candidates).toContainEqual({ rowIndex: 1, columnIndex: -1 });
    });
  });

  describe('when multiple marks are adjacent', () => {
    it('does not return duplicate candidates', () => {
      const matrix = new Matrix<Mark>({ maxRowIndex: 4, maxColumnIndex: 4 });
      matrix.set(2, 2, Mark.CROSS);
      matrix.set(2, 3, Mark.NOUGHT);

      const candidates = getNextCellCandidates(matrix);

      const uniqueKeys = new Set(candidates.map((c) => `${c.rowIndex}_${c.columnIndex}`));
      expect(uniqueKeys.size).toBe(candidates.length);
    });

    it('does not include occupied cells', () => {
      const matrix = new Matrix<Mark>({ maxRowIndex: 4, maxColumnIndex: 4 });
      matrix.set(2, 2, Mark.CROSS);
      matrix.set(2, 3, Mark.NOUGHT);

      const candidates = getNextCellCandidates(matrix);

      const occupiedCells = [
        { rowIndex: 2, columnIndex: 2 },
        { rowIndex: 2, columnIndex: 3 },
      ];

      occupiedCells.forEach((occupied) => {
        expect(candidates).not.toContainEqual(occupied);
      });
    });
  });
});
