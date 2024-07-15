import { formatTestName } from '@aminzer/describe-function-test';
import Matrix from '../Matrix';

describe(formatTestName(__filename), () => {
  let matrix: Matrix<string>;
  let clonedMatrix: Matrix<string>;

  beforeEach(() => {
    matrix = new Matrix<string>({
      maxRowIndex: 1,
      maxColumnIndex: 1,
    });

    matrix.set(0, 0, 'a');
    matrix.set(0, 1, 'b');
    matrix.set(1, 0, 'c');
    matrix.set(1, 1, 'd');

    clonedMatrix = matrix.clone();
  });

  it('creates copy of initial matrix', () => {
    expect(clonedMatrix.minRowIndex).toBe(0);
    expect(clonedMatrix.maxRowIndex).toBe(1);
    expect(clonedMatrix.minColumnIndex).toBe(0);
    expect(clonedMatrix.maxColumnIndex).toBe(1);

    expect(clonedMatrix.get(0, 0)).toBe('a');
    expect(clonedMatrix.get(0, 1)).toBe('b');
    expect(clonedMatrix.get(1, 0)).toBe('c');
    expect(clonedMatrix.get(1, 1)).toBe('d');
  });

  describe('when cloned matrix is changed', () => {
    beforeEach(() => {
      clonedMatrix.maxRowIndex = 0;
      clonedMatrix.maxColumnIndex = 0;

      clonedMatrix.set(0, 0, 'e');
    });

    it('updates cloned matrix', () => {
      expect(clonedMatrix.minRowIndex).toBe(0);
      expect(clonedMatrix.maxRowIndex).toBe(0);
      expect(clonedMatrix.minColumnIndex).toBe(0);
      expect(clonedMatrix.maxColumnIndex).toBe(0);

      expect(clonedMatrix.get(0, 0)).toBe('e');
    });

    it("doesn't update initial matrix", () => {
      expect(matrix.minRowIndex).toBe(0);
      expect(matrix.maxRowIndex).toBe(1);
      expect(matrix.minColumnIndex).toBe(0);
      expect(matrix.maxColumnIndex).toBe(1);

      expect(matrix.get(0, 0)).toBe('a');
      expect(matrix.get(0, 1)).toBe('b');
      expect(matrix.get(1, 0)).toBe('c');
      expect(matrix.get(1, 1)).toBe('d');
    });
  });
});
