import { formatTestName } from '../../test';
import Matrix from '../Matrix';

describe(formatTestName(__filename), () => {
  const minRowIndex = 0;
  const maxRowIndex = 2;
  const minColumnIndex = 10;
  const maxColumnIndex = 12;

  const matrix = new Matrix<string>({
    minRowIndex,
    maxRowIndex,
    minColumnIndex,
    maxColumnIndex,
  });

  for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
    for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
      matrix.set(rowIndex, columnIndex, `${rowIndex}-${columnIndex}`);
    }
  }

  describe('when list size was decreased and increased back', () => {
    matrix.minRowIndex += 1;
    matrix.minRowIndex -= 1;
    matrix.maxRowIndex -= 1;
    matrix.maxRowIndex += 1;
    matrix.minColumnIndex += 1;
    matrix.minColumnIndex -= 1;
    matrix.maxColumnIndex -= 1;
    matrix.maxColumnIndex += 1;

    it('clears elements that were outside decreased index range', () => {
      for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex += 1) {
        for (let columnIndex = minColumnIndex; columnIndex <= maxColumnIndex; columnIndex += 1) {
          if (rowIndex === 1 && columnIndex === 11) {
            continue;
          }

          expect(matrix.get(rowIndex, columnIndex)).toBe(undefined);
        }
      }
    });

    it('preserve elements that were within decreased index range', () => {
      expect(matrix.get(1, 11)).toBe('1-11');
    });
  });
});
