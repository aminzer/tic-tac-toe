import { formatTestName } from '@aminzer/describe-function-test';
import Matrix from '../Matrix';

describe(formatTestName(__filename), () => {
  describe('when cell is within matrix', () => {
    const matrix = new Matrix<string>({
      maxRowIndex: 2,
      maxColumnIndex: 2,
    });

    matrix.set(0, 0, 'a');
    matrix.set(0, 1, 'b');

    it('deletes matrix cell value', () => {
      matrix.delete(0, 0);

      expect(matrix.get(0, 0)).toBe(undefined);
      expect(matrix.get(0, 1)).toBe('b');
    });
  });

  describe('when cell is outside of matrix', () => {
    const matrix = new Matrix<string>({
      maxRowIndex: 2,
      maxColumnIndex: 2,
    });

    it('throws error when cell is out of matrix', () => {
      expect(() => matrix.delete(3, 2)).toThrow();
    });
  });
});
