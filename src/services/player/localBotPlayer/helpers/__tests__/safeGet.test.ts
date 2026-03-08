import { formatTestName } from '@aminzer/describe-function-test';
import { Mark } from '@app/constants';
import { Matrix } from '@app/dataStructures';
import safeGet from '../safeGet';

describe(formatTestName(__filename), () => {
  let matrix: Matrix<Mark>;

  beforeEach(() => {
    matrix = new Matrix<Mark>({ maxRowIndex: 2, maxColumnIndex: 2 });
    matrix.set(0, 0, Mark.CROSS);
    matrix.set(1, 1, Mark.NOUGHT);
  });

  describe('when cell is within matrix bounds', () => {
    it('returns the mark at an occupied cell', () => {
      expect(safeGet(matrix, 0, 0)).toBe(Mark.CROSS);
      expect(safeGet(matrix, 1, 1)).toBe(Mark.NOUGHT);
    });

    it('returns undefined at an empty cell', () => {
      expect(safeGet(matrix, 0, 1)).toBe(undefined);
      expect(safeGet(matrix, 2, 2)).toBe(undefined);
    });
  });

  describe('when cell is outside matrix bounds', () => {
    it('returns undefined for row below min', () => {
      expect(safeGet(matrix, -1, 0)).toBe(undefined);
    });

    it('returns undefined for row above max', () => {
      expect(safeGet(matrix, 3, 0)).toBe(undefined);
    });

    it('returns undefined for column below min', () => {
      expect(safeGet(matrix, 0, -1)).toBe(undefined);
    });

    it('returns undefined for column above max', () => {
      expect(safeGet(matrix, 0, 3)).toBe(undefined);
    });
  });
});
