import { formatTestName } from '@aminzer/describe-function-test';
import Matrix from '../Matrix';

describe(formatTestName(__filename), () => {
  describe('when cell is within matrix', () => {
    const matrix = new Matrix<string>({
      maxRowIndex: 2,
      maxColumnIndex: 2,
    });

    matrix.set(0, 0, 'a');
    matrix.set(0, 0, 'b');
    matrix.set(0, 1, 'c');

    it('returns element at matrix cell', () => {
      expect(matrix.get(0, 0)).toBe('b');
      expect(matrix.get(0, 1)).toBe('c');
      expect(matrix.get(0, 2)).toBe(undefined);
    });
  });

  describe('when cell is outside of matrix', () => {
    const matrix = new Matrix<string>({
      maxRowIndex: 2,
      maxColumnIndex: 2,
    });

    it('throws error when cell is out of matrix', () => {
      const cellsOutsideMatrix = [
        [-1, 0],
        [3, 0],
        [0, -1],
        [0, 3],
      ];

      cellsOutsideMatrix.forEach(([rowIndex, columnIndex]) => {
        expect(() => matrix.get(rowIndex, columnIndex)).toThrow();
        expect(() => matrix.set(rowIndex, columnIndex, 'a')).toThrow();
      });
    });
  });
});
